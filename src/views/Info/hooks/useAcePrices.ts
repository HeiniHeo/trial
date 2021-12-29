import { useBlocksFromTimestamps } from 'views/Info/hooks/useBlocksFromTimestamps'
import { getDeltaTimestamps } from 'views/Info/utils/infoQueryHelpers'
import { useState, useEffect } from 'react'
import { request, gql } from 'graphql-request'
import { INFO_CLIENT } from 'config/constants/endpoints'

export interface AcePrices {
  current: number
  oneDay: number
  twoDay: number
  week: number
}

const ACE_PRICES = gql`
  query prices($block24: Int!, $block48: Int!, $blockWeek: Int!) {
    current: bundle(id: "1") {
      acePrice
    }
    oneDay: bundle(id: "1", block: { number: $block24 }) {
      acePrice
    }
    twoDay: bundle(id: "1", block: { number: $block48 }) {
      acePrice
    }
    oneWeek: bundle(id: "1", block: { number: $blockWeek }) {
      acePrice
    }
  }
`

interface PricesResponse {
  current: {
    acePrice: string
  }
  oneDay: {
    acePrice: string
  }
  twoDay: {
    acePrice: string
  }
  oneWeek: {
    acePrice: string
  }
}

const fetchAcePrices = async (
  block24: number,
  block48: number,
  blockWeek: number,
): Promise<{ acePrices: AcePrices | undefined; error: boolean }> => {
  try {
    const data = await request<PricesResponse>(INFO_CLIENT, ACE_PRICES, {
      block24,
      block48,
      blockWeek,
    })
    return {
      error: false,
      acePrices: {
        current: parseFloat(data.current?.acePrice ?? '0'),
        oneDay: parseFloat(data.oneDay?.acePrice ?? '0'),
        twoDay: parseFloat(data.twoDay?.acePrice ?? '0'),
        week: parseFloat(data.oneWeek?.acePrice ?? '0'),
      },
    }
  } catch (error) {
    console.error('Failed to fetch ACE prices', error)
    return {
      error: true,
      acePrices: undefined,
    }
  }
}

/**
 * Returns ACE prices at current, 24h, 48h, and 7d intervals
 */
export const useAcePrices = (): AcePrices | undefined => {
  const [prices, setPrices] = useState<AcePrices | undefined>()
  const [error, setError] = useState(false)

  const [t24, t48, tWeek] = getDeltaTimestamps()
  const { blocks, error: blockError } = useBlocksFromTimestamps([t24, t48, tWeek])

  useEffect(() => {
    const fetch = async () => {
      const [block24, block48, blockWeek] = blocks

      // Handle launching analytics on D+3 where blockWeek is undefined
      const { acePrices, error: fetchError } = await fetchAcePrices(
        block24.number,
        block48.number,
        blockWeek ? blockWeek.number : block48.number,
      )

      if (fetchError) {
        setError(true)
      } else {
        setPrices(acePrices)
      }
    }
    if (!prices && !error && blocks && !blockError) {
      fetch()
    }
  }, [error, prices, blocks, blockError])

  return prices
}
