import BigNumber from 'bignumber.js'
import { getAdeVaultContract } from 'utils/contractHelpers'

const adeVaultContract = getAdeVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await adeVaultContract.userInfo(account)
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares.toString()).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime.toString(),
      lastUserActionTime: userContractResponse.lastUserActionTime.toString(),
      adeAtLastUserAction: new BigNumber(userContractResponse.adeAtLastUserAction.toString()).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      adeAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
