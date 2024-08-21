import { useQueryClient } from "@tanstack/vue-query"
import type { UseBalanceParameters } from "@wagmi/vue"

/**
 * Wrapper around wagmi's useBalance hook. Updates data on every block change.
 */
export function useWatchBalance(useBalanceParameters: UseBalanceParameters) {
    debugger
    const { targetNetwork } = useTargetNetwork()
    const queryClient = useQueryClient()
    const { data: blockNumber } = useBlockNumber({
        watch: true,
        chainId: targetNetwork.value.id,
    })
    const { queryKey, ...restUseBalanceReturn } = useBalance(useBalanceParameters)

    watch(blockNumber, () => {
        queryClient.invalidateQueries(queryKey)
    })

    return restUseBalanceReturn
}