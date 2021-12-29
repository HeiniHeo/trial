import React from 'react'
import { ethers } from 'ethers'
import { CheckmarkCircleIcon, CheckmarkCircleFillIcon, Tag, useTooltip } from '@acentswap/ace-uikit'
import { useTranslation } from 'contexts/Localization'
import { formatAcev2 } from '../../helpers'

interface EnteredTagProps {
  amount?: ethers.BigNumber
  hasClaimed?: boolean
}

const EnteredTag: React.FC<EnteredTagProps> = ({ amount, hasClaimed = false }) => {
  const { t } = useTranslation()
  const { targetRef, tooltipVisible, tooltip } = useTooltip(
    <div style={{ whiteSpace: 'nowrap' }}>{`${formatAcev2(amount)} ACE`}</div>,
    { placement: 'bottom' },
  )

  return (
    <>
      <span ref={targetRef}>
        <Tag
          variant="secondary"
          fontWeight="bold"
          textTransform="uppercase"
          outline={!hasClaimed}
          startIcon={hasClaimed ? <CheckmarkCircleFillIcon width="18px" /> : <CheckmarkCircleIcon width="18px" />}
        >
          {hasClaimed ? t('Claimed') : t('Entered')}
        </Tag>{' '}
      </span>{' '}
      {tooltipVisible && tooltip}
    </>
  )
}

export default EnteredTag
