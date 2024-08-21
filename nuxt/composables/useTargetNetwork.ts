import scaffoldConfig from "~/scaffold.config"
import { NETWORKS_EXTRA_DATA } from "~/utils/scaffold-eth/networks"

/**
 * Retrieves the connected wallet's network from scaffold.config or defaults to the 0th network in the list if the wallet is not connected.
 */
export function useTargetNetwork() {
    const { chain } = useAccount()
    const { targetNetwork } = storeToRefs(useGlobalStore())

    watch(() => chain.value, (newTargetNetwork) => {
        debugger
        const newSelectedNetwork = scaffoldConfig.targetNetworks.find((network) => network.id === newTargetNetwork.id)
        if (newSelectedNetwork && newSelectedNetwork.id !== targetNetwork.value.id) {
            targetNetwork.value = newSelectedNetwork
        }
    })

    const computedTargetNetwork = computed(() => ({
        ...targetNetwork.value,
        ...NETWORKS_EXTRA_DATA[targetNetwork.value.id]
    }))

    return {
        targetNetwork: computedTargetNetwork
    }
}