import React from 'react'
import { CardHeader, Heading, Text, Flex } from '@acentswap/ace-uikit'
import { Token } from '@acentswap/ace-sdk'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { TokenPairImage } from 'components/TokenImage'
import AdeVaultTokenPairImage from '../AdeVaultCard/AdeVaultTokenPairImage'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: ${({ isFinished, background, theme }) =>
    isFinished ? theme.colors.backgroundDisabled : 'linear-gradient(89.96deg, #AFCDE0 0.03%, #DABF7B 99.83%)'};
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
  padding: 12px 24px;
`

const StyledTokenPairImage = styled(TokenPairImage)`
  > div {
    width: 42px;
    top: 50%;
    margin-top: -21px;
    bottom: auto;
  }
`

const StyledAdeVaultTokenPairImage = styled(AdeVaultTokenPairImage)`
  > div {
    width: 42px;
    top: 50%;
    margin-top: -21px;
    bottom: auto;
  }
`

const StyledCardHeader: React.FC<{
  earningToken: Token
  stakingToken: Token
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
}> = ({ earningToken, stakingToken, isFinished = false, isAutoVault = false, isStaking = false }) => {
  const { t } = useTranslation()
  const isAdePool = earningToken.symbol === 'ADE' && stakingToken.symbol === 'ADE'
  const background = isStaking ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return t('Auto')
    }
    if (isAdePool) {
      // manual ade
      return t('Manual')
    }
    // all other pools
    return t('Earn')
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return t('Stake and forget')
    }
    if (isAdePool) {
      return t('Manual staking')
    }
    return t('Stake %symbol%', { symbol: stakingToken.symbol })
  }

  return (
    <Wrapper isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : 'text'} scale="lg">
            {`${getHeadingPrefix()} ${earningToken.symbol}`}
          </Heading>
          <Text color={isFinished ? 'textDisabled' : 'textSubtle'}>{getSubHeading()}</Text>
        </Flex>
        {isAutoVault ? (
          <StyledAdeVaultTokenPairImage width={64} height={64} />
        ) : (
          <StyledTokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} width={64} height={64} />
        )}
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
