import React from 'react'
import { Flex, Text } from '@acentswap/ace-uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { usePriceAdeUsdc } from 'state/farms/hooks'
import { useAdeVault } from 'state/pools/hooks'
import { getAdeVaultEarnings } from 'views/Pools/helpers'
import RecentAdeProfitBalance from './RecentAdeProfitBalance'

const RecentAdeProfitCountdownRow = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    pricePerFullShare,
    userData: { adeAtLastUserAction, userShares, lastUserActionTime },
  } = useAdeVault()
  const adePriceUsdc = usePriceAdeUsdc()
  const { hasAutoEarnings, autoAdeToDisplay, autoUsdToDisplay } = getAdeVaultEarnings(
    account,
    adeAtLastUserAction,
    userShares,
    pricePerFullShare,
    adePriceUsdc.toNumber(),
  )

  const lastActionInMs = lastUserActionTime && parseInt(lastUserActionTime) * 1000
  const dateTimeLastAction = new Date(lastActionInMs)
  const dateStringToDisplay = dateTimeLastAction.toLocaleString()

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text small color="textSubtle">{`${t('Recent ADE profit')}:`}</Text>
      {hasAutoEarnings && (
        <RecentAdeProfitBalance
          adeToDisplay={autoAdeToDisplay}
          dollarValueToDisplay={autoUsdToDisplay}
          dateStringToDisplay={dateStringToDisplay}
        />
      )}
    </Flex>
  )
}

export default RecentAdeProfitCountdownRow
