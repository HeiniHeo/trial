import React from 'react'
import { Text, TooltipText, useTooltip } from '@acentswap/ace-uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { isBlindMode } from 'utils'

interface RecentAdeProfitBalanceProps {
  adeToDisplay: number
  dollarValueToDisplay: number
  dateStringToDisplay: string
}

const RecentAdeProfitBalance: React.FC<RecentAdeProfitBalanceProps> = ({
  adeToDisplay,
  dollarValueToDisplay,
  dateStringToDisplay,
}) => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Balance fontSize="16px" value={adeToDisplay} decimals={3} bold unit=" ADE" />
      {!isBlindMode() && <Balance fontSize="16px" value={dollarValueToDisplay} decimals={2} bold prefix="~$" />}
      {t('Earned since your last action')}
      <Text>{dateStringToDisplay}</Text>
    </>,
    {
      placement: 'bottom-end',
    },
  )

  return (
    <>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        <Balance fontSize="14px" value={adeToDisplay} />
      </TooltipText>
    </>
  )
}

export default RecentAdeProfitBalance
