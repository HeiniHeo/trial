import React from 'react'
import { useLocation } from 'react-router-dom'
import { Menu as UikitMenu } from '@acentswap/ace-uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { usePriceAdeUsdc } from 'state/farms/hooks'
import { useProfile } from 'state/profile/hooks'
import { isBlindMode, isCountdown, showAdePrice } from 'utils'
import { registerToken } from 'utils/wallet'
import tokens from 'config/constants/tokens'
import config from './config/config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const adePriceUsd = usePriceAdeUsdc()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useLocation()

  const activeMenuItem = getActiveMenuItem({ menuConfig: config(t), pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })
  
  return (
    <UikitMenu
      userMenu={isCountdown() ? null : <UserMenu />}
      globalMenu={isCountdown() ? null : <GlobalSettings />}
      isDark={isDark}
      isBlindMode={isBlindMode()}
      toggleTheme={toggleTheme}
      t={t}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      adePriceUsd={adePriceUsd.toNumber()}
      showAdePrice={showAdePrice()}
      links={isCountdown() ? [] : config(t)}
      subLinks={activeMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
      footerLinks={footerLinks(t)}
      activeItem={activeMenuItem?.href}
      activeSubItem={activeSubMenuItem?.href}
      buyAdeLabel={t('Buy ADE')}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      iconCallback={() => registerToken(tokens.ade.address, tokens.ade.symbol, tokens.ade.decimals)}
      adeAddress={tokens.ade.address}
      {...props}
    />
  )
}

export default Menu
