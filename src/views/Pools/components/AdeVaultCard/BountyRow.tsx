import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Box, Flex, Text, HelpIcon, useTooltip, useModal, Heading, Button, Skeleton } from '@acentswap/ace-uikit'
import { useTranslation } from 'contexts/Localization'
import { useAdeVault } from 'state/pools/hooks'
import Balance from 'components/Balance'
import { usePriceAdeUsdc } from 'state/farms/hooks'
import { getBalanceNumber } from 'utils/formatBalance'

import { isBlindMode } from 'utils'
import BountyModal from '../BountyModal'

const BountyRow = () => {
  const { t } = useTranslation()
  const {
    estimatedAdeBountyReward,
    fees: { callFee },
  } = useAdeVault()
  const adePriceUsdc = usePriceAdeUsdc()

  const estimatedDollarBountyReward = useMemo(() => {
    return new BigNumber(estimatedAdeBountyReward).multipliedBy(adePriceUsdc)
  }, [adePriceUsdc, estimatedAdeBountyReward])

  const hasFetchedDollarBounty = estimatedDollarBountyReward.gte(0)
  const hasFetchedAdeBounty = estimatedAdeBountyReward ? estimatedAdeBountyReward.gte(0) : false
  const dollarBountyToDisplay = hasFetchedDollarBounty ? getBalanceNumber(estimatedDollarBountyReward, 18) : 0
  const adeBountyToDisplay = hasFetchedAdeBounty ? getBalanceNumber(estimatedAdeBountyReward, 18) : 0

  const TooltipComponent = ({ fee }: { fee: number }) => (
    <>
      <Text mb="16px">{t('Optional Feature: Auto-compound Bounty Reward')}</Text>
      <Text mb="16px">
        {t(
          'Whenever you successfully claim the bounty, you’re also helping to trigger auto-compounding for all auto ADE users. The displayed amount does not belong to you until claimed.',
        )}
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        {t('Bounty Amount: %fee%% of all Auto ADE pool pending rewards', { fee: fee / 100 })}
      </Text>
    </>
  )

  const [onPresentBountyModal] = useModal(<BountyModal TooltipComponent={TooltipComponent} />)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent fee={callFee} />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  return (
    <>
      {tooltipVisible && tooltip}
      <Flex alignItems="center" mb="12px">
        <Text small textTransform="uppercase" mr="8px">
          {t('Bounty')}
        </Text>
        <Box ref={targetRef}>
          <HelpIcon color="primary" />
        </Box>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column" mr="12px">
          <Heading>
            {hasFetchedAdeBounty ? (
              <Balance color="textSubtle" fontSize="20px" bold value={adeBountyToDisplay} decimals={3} />
            ) : (
              <Skeleton height={20} width={96} mb="2px" />
            )}
          </Heading>
          {hasFetchedDollarBounty && !isBlindMode() ? (
            <Balance
              fontSize="14px"
              color="textSubtle"
              value={dollarBountyToDisplay}
              decimals={2}
              unit=" USD"
              prefix="~"
            />
          ) : (
            <Skeleton height={16} width={62} />
          )}
        </Flex>
        <Button
          disabled={!dollarBountyToDisplay || !adeBountyToDisplay || !callFee}
          onClick={onPresentBountyModal}
          id="clickClaimVaultBounty"
        >
          {t('Claim')}
        </Button>
      </Flex>
    </>
  )
}

export default BountyRow
