const ADE_EXTENDED = 'https://acentswap.acent.tech/ade-extended.json'
const ADE_TOP100 = 'https://acentswap.acent.tech/ade-top-100.json'

export const UNSUPPORTED_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  // ADE_TOP100,
  // ADE_EXTENDED,
  // ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched aacess
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
