import React from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@acentswap/ace-uikit'
import { DeserializedPool } from 'state/types'
import { useAdeVault } from 'state/pools/hooks'
import { useTranslation } from 'contexts/Localization'
import { isBlindMode } from 'utils'
import BaseCell, { CellContent } from './BaseCell'
import Apr from '../Apr'
import { convertSharesToAde } from '../../../helpers'

interface AprCellProps {
  pool: DeserializedPool
}

const StyledCell = styled(BaseCell)`
  flex: 1 0 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
  }
`

const AutoAprCell: React.FC<AprCellProps> = ({ pool }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const {
    userData: { userShares },
    fees: { performanceFee },
    pricePerFullShare,
  } = useAdeVault()

  const { adeAsBigNumber } = convertSharesToAde(userShares, pricePerFullShare)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {isBlindMode() ? t('ADE Allocation') : t('APY')}
        </Text>
        {isBlindMode() ? "/ Block" : <Apr pool={pool} stakedBalance={adeAsBigNumber} performanceFee={performanceFeeAsDecimal} showIcon={!isMobile} />}
      </CellContent>
    </StyledCell>
  )
}

export default AutoAprCell
