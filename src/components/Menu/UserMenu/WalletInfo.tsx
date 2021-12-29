import React from 'react'
import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Skeleton, Text } from '@acentswap/ace-uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance, { FetchStatus, useGetAceBalance } from 'hooks/useTokenBalance'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { getExplorerLink } from 'utils'
import { getFullDisplayBalance, formatBigNumber } from 'utils/formatBalance'
import tokens from 'config/constants/tokens'
import CopyAddress from './CopyAddress'

interface WalletInfoProps {
  hasLowACEBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const balanceRowStyles = {
  padding: '6px 0px',
}

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowACEBalance, onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance, fetchStatus } = useGetAceBalance()
  const { balance: adeBalance, fetchStatus: adeFetchStatus } = useTokenBalance(tokens.ade.address)
  const { logout } = useAuth()

  const handleLogout = () => {
    onDismiss()
    logout()
  }

  return (
    <>
      <Text color="textSubtle" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
        {t('Your Address')}
      </Text>
      <CopyAddress account={account} mb="24px" />
      {hasLowACEBalance && (
        <Message variant="warning" mb="24px" icon={false}>
          <Box>
            <Text fontWeight="bold">{t('ACE Balance Low')}</Text>
            <Text as="p">{t('You need ACE for transaction fees.')}</Text>
          </Box>
        </Message>
      )}
      <Flex alignItems="center" justifyContent="space-between" style={balanceRowStyles}>
        <Text color="textSubtle">{t('ACE Balance')}</Text>
        {fetchStatus !== FetchStatus.SUCCESS ? (
          <Skeleton height="22px" width="60px" />
        ) : (
          <Text>{formatBigNumber(balance, 6)}</Text>
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px" style={balanceRowStyles}>
        <Text color="textSubtle">{t('ADE Balance')}</Text>
        {adeFetchStatus !== FetchStatus.SUCCESS ? (
          <Skeleton height="22px" width="60px" />
        ) : (
          <Text>{getFullDisplayBalance(adeBalance, 18, 3)}</Text>
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="start" mb="24px">
        <LinkExternal color="blue" href={getExplorerLink(account, 'address')}>
          <Text fontSize="13px">{t('View on Acenos Explorer')}</Text>
        </LinkExternal>
      </Flex>
      <Button variant="primary" height="60px" width="100%" onClick={handleLogout}>
        {t('Disconnect Wallet')}
      </Button>
    </>
  )
}

export default WalletInfo
