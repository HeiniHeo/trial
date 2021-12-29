import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'ADE Finance | Simple DeFi Trading For All',
  description: 'ADE Finance is your gateway to the decentralized finance movement.Take control of your finances and earn sparkly ADE rewards.Low fees, fast transactions and competitive earnings.',
  image: 'https://acentswap.acent.tech/images/logo.png',
  siteName: 'ADE Finance',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
    // } else if (path.startsWith('/teams')) {
    //   basePath = '/teams'
    // } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    //   basePath = '/voting/proposal'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('ADE Finance')} | ${t('Simple DeFi Trading For All')}`,
        description: t('ADE Finance is your gateway to the decentralized finance movement.Take control of your finances and earn sparkly ADE rewards.Low fees, fast transactions and competitive earnings.')
      }
    case '/swap':
      return {
        title: `${t('ADE Finance')} | ${t('Swap Tokens With Low Fees')}`,
        description: t('ADE Finance Brilliant Swap is the best place to trade DeFi token instantly with low fees.Sign up to earn crypto today on ADE Finance Brilliant Swap!')
      }
    case '/add':
      return {
        title: `${t('ADE Finance')} | ${t('Liquidity')} | ${t('Add')}`,
        description: t('Become a liquidity provider on ADE. Add liquidity to earn trading fees and ADE rewards.')
      }
    case '/remove':
      return {
        title: `${t('ADE Finance')} | ${t('Liquidity')} | ${t('Remove')}`,
        description: t('Remove Liquidity and receive your tokens back.')
      }
    case '/liquidity':
      return {
        title: `${t('ADE Finance')} | ${t('Provide Liquidity And Earn Rewards')}`,
        description: t('Supply a token pair to receive liquidity provider (LP) tokens.Collect transaction fees and farm shiny ADE rewards.')
      }
    case '/find':
      return {
        title: `${t('ADE Finance')} | ${t('Liquidity')} | ${t('Find')}`,
        description: t('Manually find Liquidity Provider tokens that may not appear automatically in the Liquidity page.')
      }
    // case '/competition':
    //   return {
    //     title: `${t('Trading Battle')} | ${t('ADE Finance')}`,
    //   }
    // case '/prediction':
    //   return {
    //     title: `${t('Prediction')} | ${t('ADE Finance')}`,
    //   }
    // case '/prediction/leaderboard':
    //   return {
    //     title: `${t('Leaderboard')} | ${t('ADE Finance')}`,
    //   }
    case '/farms':
      return {
        title: `${t('ADE Finance')} | ${t('Yield Farming By Staking LP Tokens')}`,
        description: t('Earn DeFi Crypto Rewards with ADE Finance Crystal Farms.Stake your tokens in our Crystal Farm and receive ADE rewards every few seconds! Our harvests are always bountiful.')
      }
    // case '/farms/auction':
    //   return {
    //     title: `${t('Farm Auctions')} | ${t('ADE Finance')}`,
    //   }
    case '/mines':
      return {
        title: `${t('ADE Finance')} | ${t('Stake ADE Token For Extra Rewards')}`,
        description: t('Stake your ADE tokens for a fixed amount in our Glitter Mine, start mining attractive ADE and partner token rewards.')
      }
    // case '/lottery':
    //   return {
    //     title: `${t('Lottery')} | ${t('ADE Finance')}`,
    //   }
    // case '/collectibles':
    //   return {
    //     title: `${t('Collectibles')} | ${t('ADE Finance')}`,
    //   }
    // case '/ifo':
    //   return {
    //     title: `${t('Initial Farm Offering')} | ${t('ADE Finance')}`,
    //   }
    // case '/teams':
    //   return {
    //     title: `${t('Leaderboard')} | ${t('ADE Finance')}`,
    //   }
    // case '/profile':
    //   return {
    //     title: `${t('Your Profile')} | ${t('ADE Finance')}`,
    //   }
    // case '/profile/tasks':
    //   return {
    //     title: `${t('Task Center')} | ${t('ADE Finance')}`,
    //   }
    // case '/voting':
    //   return {
    //     title: `${t('Voting')} | ${t('ADE Finance')}`,
    //   }
    // case '/voting/proposal':
    //   return {
    //     title: `${t('Proposals')} | ${t('ADE Finance')}`,
    //   }
    // case '/voting/proposal/create':
    //   return {
    //     title: `${t('Make a Proposal')} | ${t('ADE Finance')}`,
    //   }
    case '/info':
      return {
        title: `${t('ADE Finance')} | ${t('Data Analytics')}`,
        description: t('Find out the latest info on ADE. Explore to find the Liquidity, Volume 24H,Top Tokens,Top Farms,Transactions and more.'),
      }
    case '/info/farms':
      return {
        title: `${t('ADE Finance')} | ${t('Analytics')} | ${t('Farms')}}`,
        description: t('Find out the latest info on all Crystal Farms. Explore to find the Volume 24H,Volume 7D, LP Rewards Fees 24H,LP Reward APR, Liquidity and more.'),
      }
    case '/info/tokens':
      return {
        title: `${t('ADE Finance')} | ${t('Analytics')} | ${t('Tokens')}`,
        description: t('Find out the latest info on all Tokens. Explore to find the Top Movers,Price,Price Change,Volume 24H,Liquidity and more.'),
      }
    default:
      return null
  }
}
