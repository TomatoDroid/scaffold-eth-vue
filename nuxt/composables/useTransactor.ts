import type { Config } from "@wagmi/vue";
import { getConnectorClient, getPublicClient, getWalletClient } from "@wagmi/vue/actions";
import type { SendTransactionMutate } from "@wagmi/vue/query";
import type { Hash, SendTransactionParameters, WalletClient } from "viem";
import { config } from "~/wagmiConfig";
import type { TransactorFuncOptions } from "~/utils/scaffold-eth/contract";
import { getBlockExplorerTxLink } from "~/utils/scaffold-eth/networks";

type TransactionFunc = (
    tx: (() => Promise<Hash>) | Parameters<SendTransactionMutate<Config, undefined>>[0],
    options?: TransactorFuncOptions
) => Promise<Hash | undefined>

/**
 * Runs Transaction passed in to returned function showing UI feedback.
 * @param _walletClient - Optional wallet client to use. If not provided, will use the one from useWalletClient.
 * @returns function that takes in transaction function as callback, shows UI feedback for transaction and returns a promise of the transaction hash
 */
export const useTransactor = (_walletClient?: WalletClient) => {
    const toast = useToast()

    let walletClient = ref<WalletClient | undefined>(_walletClient)

    onBeforeMount(async() => {
        if (walletClient.value === undefined) {
            const client = await getWalletClient(config)
            walletClient.value = client
        }
    })

    const result: TransactionFunc = async (tx, options) => {
        if (!walletClient.value) {
            toast.add({ title: "Please connect wallet first" })
            console.error("⚡️ ~ file: useTransactor.tsx ~ error");
            return
        }

        const notificationId = '_notificationId'
        let transactionHash: Hash | undefined = undefined
        try {
            const network = await walletClient.value.getChainId()
            const publicClient = getPublicClient(config)

            toast.add({
                id: notificationId,
                title: "Awaiting for user confirmation",
                icon: "i-mdi-loading",
            })
            if (typeof tx === "function") {
                transactionHash = await tx()
            } else if (tx != null) {
                transactionHash = await walletClient.value.sendTransaction(tx as SendTransactionParameters)
            } else {
                throw new Error("Incorrect transaction passed to transactor");
            }
            toast.remove(notificationId)

            const blockExplorerTxURL = network ? getBlockExplorerTxLink(network, transactionHash) : "";

            toast.add({id: notificationId, title: 'Waiting for transaction to complete.', description: `${blockExplorerTxURL}`})

            const transactionReceipt = await publicClient.waitForTransactionReceipt({
                hash: transactionHash,
                confirmations: options?.blockConfirmations
            })
            toast.remove(notificationId)
            toast.add({id: notificationId, title: 'Transaction completed successfully!', description: `${blockExplorerTxURL}`})

            if (options?.onBlockConfirmation) options.onBlockConfirmation(transactionReceipt);
        } catch (error) {
            if (notificationId) {
                toast.remove(notificationId)
            }
            console.error("⚡️ ~ file: useTransactor.ts ~ error", error);
            throw error
        }
        return transactionHash
    }
    return result
}