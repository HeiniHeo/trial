import React from 'react'
import { TokenPairImage, ImageProps } from '@acentswap/ace-uikit'
import { mainnetTokens } from 'config/constants/tokens'

const AdeVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `/images/tokens/${mainnetTokens.ade.address}.svg`

  return <TokenPairImage primarySrc={primaryTokenSrc} secondarySrc="/images/tokens/autorenew.svg" {...props} />
}

export default AdeVaultTokenPairImage
