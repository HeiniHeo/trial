import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useMemo, useState } from 'react'
import { Flex, Text, Heading, Image, useMatchBreakpoints, Skeleton } from '@acentswap/ace-uikit'
import { useTranslation } from 'contexts/Localization'

import Balance from 'components/Balance'
import { useFetchPublicPoolsData, useFetchUserPools, usePools, useAdeVault } from 'state/pools/hooks'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { convertSharesToAde, getAprData } from 'views/Pools/helpers'
import { isBlindMode } from 'utils'
import { Wrapper } from '../FarmsCard'

const MinesCard = () => {
  const { t } = useTranslation()
  const { isDesktop } = useMatchBreakpoints()

  const { account } = useWeb3React()
  useFetchPublicPoolsData();
  useFetchUserPools(account)
  const { pools: poolsWithoutAutoVault } = usePools()
  const adePool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
  const adeAutoVault = { ...adePool, isAutoVault: true }
  const pools = [adeAutoVault, ...poolsWithoutAutoVault]

  let totalStakedPools = BIG_ZERO
  let totalStakedAde = BIG_ZERO
  const {
    userData: { userShares },
    fees: { performanceFee },
    pricePerFullShare,
  } = useAdeVault()
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100
  let autoAdeApr: number;
  let manualAdeApr: number;
  pools.forEach(pool => {
    const { apr: earningsPercentageToDisplay } = getAprData(pool, performanceFeeAsDecimal)
    if (pool.isAutoVault) {
      const { adeAsBigNumber } = convertSharesToAde(userShares, pricePerFullShare)
      const stakedAutoDollarValue = getBalanceNumber(adeAsBigNumber.multipliedBy(pool.stakingTokenPrice), pool.stakingToken.decimals)
      if (!Number.isNaN(stakedAutoDollarValue) && stakedAutoDollarValue) {
        totalStakedPools = totalStakedPools.plus(stakedAutoDollarValue)
        totalStakedAde = totalStakedAde.plus(getBalanceNumber(adeAsBigNumber, pool.stakingToken.decimals))
        autoAdeApr = earningsPercentageToDisplay
      }
    } else {
      const stakedTokenDollarBalance = getBalanceNumber(
        pool.userData.stakedBalance.multipliedBy(pool.stakingTokenPrice),
        pool.stakingToken.decimals,
      )
      if (!Number.isNaN(stakedTokenDollarBalance) && stakedTokenDollarBalance) {
        totalStakedPools = totalStakedPools.plus(stakedTokenDollarBalance)
        totalStakedAde = totalStakedAde.plus(getBalanceNumber(pool.userData.stakedBalance, pool.stakingToken.decimals))
        manualAdeApr = earningsPercentageToDisplay
      }
    }
  })

  const [percent, setPercent] = useState(0)
  const [title, setTitle] = useState('')
  useEffect(() => {
    if (autoAdeApr && manualAdeApr) {
      setPercent((autoAdeApr + manualAdeApr) / 2)
      setTitle(t('Average Annual ROI'))
    } else if (autoAdeApr) {
      setPercent(autoAdeApr)
      setTitle(t('Average APY'))
    } else if (manualAdeApr) {
      setPercent(manualAdeApr)
      setTitle(t('Average APR'))
    } else {
      setTitle(t('Average APR'))
    }
  }, [autoAdeApr, manualAdeApr, t])

  return (
    <Wrapper mt={[null, null, '36px', null]} mb={['24px', null, '36px', null]} flexDirection="column">
      <Heading color="primary">
        {t('Glitter Mines')}
      </Heading>
      <Flex className="info" justifyContent={['space-between', null, null, 'flex-start']}>
        <Flex flexDirection="column" mt="10px" mr="24px">
          <Text minWidth="160px" color="white" bold fontSize="20px">
            <Balance
              decimals={totalStakedPools.gt(0) ? 2 : 0}
              fontSize="20px"
              color="white"
              bold
              prefix={isBlindMode() ? '' : (totalStakedPools.gt(0) ? '~$' : '$')}
              unit={isBlindMode() ? ' MM ADE' : ''}
              lineHeight="1.1"
              value={isBlindMode() ? totalStakedAde.dividedBy(1000000).toNumber() : totalStakedPools.toNumber()}
            />
          </Text>
          <Text minWidth="160px" color="grey" fontSize="13px">
            {t('Total Staked')}
          </Text>
        </Flex>
        <Flex flexDirection="column" mt="10px">
          <Text minWidth="160px" color="white" bold fontSize="20px">
            {isBlindMode() ? <Skeleton width={60} /> : <Balance
              decimals={percent ? 2 : 0}
              fontSize="20px"
              color="white"
              bold
              unit="%"
              lineHeight="1.1"
              value={percent}
            />}
          </Text>
          <Text minWidth="160px" color="grey" fontSize="13px">
            {title}
          </Text>
        </Flex>
      </Flex>
      {
        isDesktop && <Image className="bg" src="/images/dashboard/miners-bg.png" width={220} height={170} />
      }
    </Wrapper>
  )
}

export default MinesCard
