import { ContextApi } from 'contexts/Localization/types'
import BigNumber from 'bignumber.js'

export const getEarningsText = (
  numFarmsToCollect: number,
  hasAdePoolToCollect: boolean,
  earningsUsdc: BigNumber,
  t: ContextApi['t'],
): string => {
  const data = {
    earningsUsdc: earningsUsdc.toString(),
    count: numFarmsToCollect,
  }

  let earningsText = t('%earningsUsdc% to collect', data)

  if (numFarmsToCollect > 0 && hasAdePoolToCollect) {
    if (numFarmsToCollect > 1) {
      earningsText = t('%earningsUsdc% to collect from %count% farms and ADE mine', data)
    } else {
      earningsText = t('%earningsUsdc% to collect from %count% farm and ADE mine', data)
    }
  } else if (numFarmsToCollect > 0) {
    if (numFarmsToCollect > 1) {
      earningsText = t('%earningsUsdc% to collect from %count% farms', data)
    } else {
      earningsText = t('%earningsUsdc% to collect from %count% farm', data)
    }
  } else if (hasAdePoolToCollect) {
    earningsText = t('%earningsUsdc% to collect from ADE mine', data)
  }

  return earningsText
}
