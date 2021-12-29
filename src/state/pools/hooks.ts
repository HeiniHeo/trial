import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { simpleRpcProvider } from 'utils/providers'
import useRefresh from 'hooks/useRefresh'
import {
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchAdeVaultPublicData,
  fetchAdeVaultUserData,
  fetchAdeVaultFees,
  fetchPoolsStakingLimitsAsync,
} from '.'
import { State, DeserializedPool } from '../types'
import { transformPool } from './helpers'

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      dispatch(fetchPoolsPublicDataAsync(blockNumber))
    }

    fetchPoolsPublicData()
    dispatch(fetchPoolsStakingLimitsAsync())
  }, [dispatch, slowRefresh])
}

export const useFetchUserPools = (account) => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])
}

export const usePools = (): { pools: DeserializedPool[]; userDataLoaded: boolean } => {
  const { pools, userDataLoaded } = useSelector((state: State) => ({
    pools: state.pools.data,
    userDataLoaded: state.pools.userDataLoaded,
  }))
  return { pools: pools.map(transformPool), userDataLoaded }
}

export const useFetchAdeVault = () => {
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAdeVaultPublicData())
  }, [dispatch, fastRefresh])

  useEffect(() => {
    dispatch(fetchAdeVaultUserData({ account }))
  }, [dispatch, fastRefresh, account])

  useEffect(() => {
    dispatch(fetchAdeVaultFees())
  }, [dispatch])
}

export const useAdeVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalAdeInVault: totalAdeInVaultAsString,
    estimatedAdeBountyReward: estimatedAdeBountyRewardAsString,
    totalPendingAdeHarvest: totalPendingAdeHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    userData: {
      isLoading,
      userShares: userSharesAsString,
      adeAtLastUserAction: adeAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state: State) => state.pools.adeVault)

  const estimatedAdeBountyReward = useMemo(() => {
    return new BigNumber(estimatedAdeBountyRewardAsString)
  }, [estimatedAdeBountyRewardAsString])

  const totalPendingAdeHarvest = useMemo(() => {
    return new BigNumber(totalPendingAdeHarvestAsString)
  }, [totalPendingAdeHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalAdeInVault = useMemo(() => {
    return new BigNumber(totalAdeInVaultAsString)
  }, [totalAdeInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const adeAtLastUserAction = useMemo(() => {
    return new BigNumber(adeAtLastUserActionAsString)
  }, [adeAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalAdeInVault,
    estimatedAdeBountyReward,
    totalPendingAdeHarvest,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      adeAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}
