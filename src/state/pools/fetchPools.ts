import BigNumber from 'bignumber.js'
import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import adeABI from 'config/abi/ade.json'
import waceABI from 'config/abi/weth.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getSouschefV2Contract } from 'utils/contractHelpers'
import tokens from 'config/constants/tokens'

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((adePoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: adePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStaking = async () => {
  const nonAcePools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'ACE')
  const acePool = poolsConfig.filter((p) => p.stakingToken.symbol === 'ACE')

  const callsNonAcePools = nonAcePools.map((poolConfig) => {
    return {
      address: poolConfig.stakingToken.address,
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsAcePools = acePool.map((poolConfig) => {
    return {
      address: tokens.wace.address,
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const nonAcePoolsTotalStaked = await multicall(adeABI, callsNonAcePools)
  const acePoolsTotalStaked = await multicall(waceABI, callsAcePools)

  return [
    ...nonAcePools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonAcePoolsTotalStaked[index]).toJSON(),
    })),
    ...acePool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(acePoolsTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchPoolStakingLimit = async (sousId: number): Promise<BigNumber> => {
  try {
    const sousContract = getSouschefV2Contract(sousId)
    const stakingLimit = await sousContract.poolLimitPerUser()
    return new BigNumber(stakingLimit.toString())
  } catch (error) {
    return BIG_ZERO
  }
}

export const fetchPoolsStakingLimits = async (
  poolsWithStakingLimit: number[],
): Promise<{ [key: string]: BigNumber }> => {
  const validPools = poolsConfig
    .filter((p) => p.stakingToken.symbol !== 'ACE' && !p.isFinished)
    .filter((p) => !poolsWithStakingLimit.includes(p.sousId))

  // Get the staking limit for each valid pool
  // Note: We cannot batch the calls via multicall because V1 pools do not have "poolLimitPerUser" and will throw an error
  const stakingLimitPromises = validPools.map((validPool) => fetchPoolStakingLimit(validPool.sousId))
  const stakingLimits = await Promise.all(stakingLimitPromises)

  return stakingLimits.reduce((accum, stakingLimit, index) => {
    return {
      ...accum,
      [validPools[index].sousId]: stakingLimit,
    }
  }, {})
}
