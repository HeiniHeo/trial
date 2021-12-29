import { FooterLinkType } from '@acentswap/ace-uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.acentswap.acent.tech/contact-us',
      },
      {
        label: t('Blog'),
        href: 'https://ade.medium.com/',
      },
      {
        label: t('Community'),
        href: 'https://docs.acentswap.acent.tech/contact-us/telegram',
      },
      {
        label: t('ADE token'),
        href: 'https://docs.acentswap.acent.tech/tokenomics/ade',
      },
      {
        label: '—',
      },
      {
        label: t('Online Store'),
        href: 'https://ade.creator-spring.com/',
        isHighlighted: true,
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.acentswap.acent.tech/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.acentswap.acent.tech/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.acentswap.acent.tech/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/ade-finance',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.acentswap.acent.tech',
      },
    ],
  },
]
