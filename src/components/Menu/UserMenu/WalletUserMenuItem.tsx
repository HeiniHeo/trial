import React from 'react'
import { Flex, UserMenuItem, WarningIcon } from '@acentswap/ace-uikit'
import { useTranslation } from 'contexts/Localization'

interface WalletUserMenuItemProps {
  hasLowAceBalance: boolean
  onPresentWalletModal: () => void
}

const WalletUserMenuItem: React.FC<WalletUserMenuItemProps> = ({ hasLowAceBalance, onPresentWalletModal }) => {
  const { t } = useTranslation()

  return (
    <UserMenuItem as="button" onClick={onPresentWalletModal}>
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        {t('Wallet')}
        {hasLowAceBalance && <WarningIcon color="warning" width="24px" />}
      </Flex>
    </UserMenuItem>
  )
}

export default WalletUserMenuItem
