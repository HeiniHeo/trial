import BigNumber from 'bignumber.js'
import { convertSharesToAde } from 'views/Pools/helpers'
import { multicallv2 } from 'utils/multicall'
import adeVaultAbi from 'config/abi/adeVault.json'
import { getAdeVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

export const fetchPublicVaultData = async () => {
  try {
    const calls = [
      'getPricePerFullShare',
      'totalShares',
      'calculateHarvestADERewards',
      'calculateTotalPendingADERewards',
    ].map((method) => ({
      address: getAdeVaultAddress(),
      name: method,
    }))

    const [[sharePrice], [shares], [estimatedAdeBountyReward], [totalPendingAdeHarvest]] = await multicallv2(
      adeVaultAbi,
      calls,
    )

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalAdeInVaultEstimate = convertSharesToAde(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalAdeInVault: totalAdeInVaultEstimate.adeAsBigNumber.toJSON(),
      estimatedAdeBountyReward: new BigNumber(estimatedAdeBountyReward.toString()).toJSON(),
      totalPendingAdeHarvest: new BigNumber(totalPendingAdeHarvest.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalAdeInVault: null,
      estimatedAdeBountyReward: null,
      totalPendingAdeHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const calls = ['performanceFee', 'callFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: getAdeVaultAddress(),
      name: method,
    }))

    const [[performanceFee], [callFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(adeVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      callFee: callFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
