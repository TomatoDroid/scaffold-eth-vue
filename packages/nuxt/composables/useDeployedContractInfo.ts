import { getPublicClient } from '@wagmi/vue/actions'
import { deployContract } from 'viem/actions'
import { type Contract, ContractCodeStatus, type ContractName, contracts } from '~/utils/scaffold-eth/contract'
import { config } from '~/wagmiConfig'

/**
 * Gets the matching contract info for the provided contract name from the contracts present in deployedContracts.ts
 * and externalContracts.ts corresponding to targetNetworks configured in scaffold.config.ts
 */
export function useDeployedContractInfo<T extends ContractName>(contractName: T) {
  const { targetNetwork } = useTargetNetwork()
  const deployedContract = contracts?.[targetNetwork.value.id]?.[contractName as ContractName] as Contract<T>
  const status = ref<ContractCodeStatus>(ContractCodeStatus.LOADING)
  const publicClient = getPublicClient(config, {
    chainId: targetNetwork.value.id as 1 | 31337 | undefined,
  })

  watchEffect(() => {
    const checkContractDeployment = async () => {
      try {
        if (!publicClient)
          return

        if (!deployContract) {
          status.value = ContractCodeStatus.NOT_FOUND
          return
        }

        const code = await publicClient.getCode({
          address: deployedContract.address,
        })
        // If contract code is `0x` => no contract deployed on that address
        if (code === '0x') {
          status.value = ContractCodeStatus.NOT_FOUND
          return
        }
        status.value = ContractCodeStatus.DEPLOYED
      }
      catch (error) {
        console.error(error)
        status.value = ContractCodeStatus.NOT_FOUND
      }
    }
    checkContractDeployment()
  })

  return {
    data: computed(() => status.value === ContractCodeStatus.DEPLOYED ? deployedContract : undefined),
    isLoading: computed(() => status.value === ContractCodeStatus.LOADING),
  }
}
