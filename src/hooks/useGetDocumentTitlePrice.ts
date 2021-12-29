import { useEffect } from 'react'
import { useAdeUsdcPrice } from 'hooks/useUsdcPrice'

const useGetDocumentTitlePrice = () => {
  const adePriceUsdc = useAdeUsdcPrice()
  useEffect(() => {
    const adePriceUsdcString = adePriceUsdc ? adePriceUsdc.toFixed(2) : ''
    document.title = `ADE Swap - ${adePriceUsdcString}`
  }, [adePriceUsdc])
}
export default useGetDocumentTitlePrice
