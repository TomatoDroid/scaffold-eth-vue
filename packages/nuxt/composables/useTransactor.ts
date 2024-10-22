import type { Config } from '@wagmi/vue'
import { getPublicClient, getWalletClient } from '@wagmi/vue/actions'
import type { SendTransactionMutate } from '@wagmi/vue/query'
import type { Hash, SendTransactionParameters, WalletClient } from 'viem'
import type { ToastID } from 'vue-toastification/dist/types/types'
import { config } from '~/wagmiConfig'
import type { TransactorFuncOptions } from '~/utils/scaffold-eth/contract'
import { getBlockExplorerTxLink } from '~/utils/scaffold-eth/networks'
import { notification } from '~/components/scaffold-eth/debug/nitification'
import { getParsedError } from '~/utils/scaffold-eth/getParseError'

type TransactionFunc = (
  tx: (() => Promise<Hash>) | Parameters<SendTransactionMutate<Config, undefined>>[0],
  options?: TransactorFuncOptions
) => Promise<Hash | undefined>

/**
 * Runs Transaction passed in to returned function showing UI feedback.
 * @param _walletClient - Optional wallet client to use. If not provided, will use the one from useWalletClient.
 * @returns function that takes in transaction function as callback, shows UI feedback for transaction and returns a promise of the transaction hash
 */
export function useTransactor(_walletClient?: WalletClient) {
  const walletClient = ref<WalletClient | undefined>(_walletClient)
  onBeforeMount(async () => {
    if (walletClient.value === undefined) {
      const client = await getWalletClient(config)
      walletClient.value = client
    }
  })

  const result: TransactionFunc = async (tx, options) => {
    debugger
    if (!walletClient.value) {
      notification.error('Cannot access account')
      console.error('⚡️ ~ file: useTransactor.tsx ~ error')
      return
    }

    let notificationId: ToastID | null = null
    let transactionHash: Hash | undefined
    try {
      const network = await walletClient.value.getChainId()
      const publicClient = getPublicClient(config)

      notificationId = notification.loading('Awaiting for user confirmation')
      if (typeof tx === 'function') {
        transactionHash = await tx()
      }
      else if (tx != null) {
        transactionHash = await walletClient.value.sendTransaction(tx as SendTransactionParameters)
      }
      else {
        throw new Error('Incorrect transaction passed to transactor')
      }
      notification.remove(notificationId)

      const blockExplorerTxURL = network ? getBlockExplorerTxLink(network, transactionHash) : ''

      notificationId = notification.loading('Waiting for transaction to complete.')

      const transactionReceipt = await publicClient.waitForTransactionReceipt({
        hash: transactionHash,
        confirmations: options?.blockConfirmations,
      })
      notification.remove(notificationId)

      notification.success('Transaction completed successfully!')

      if (options?.onBlockConfirmation)
        options.onBlockConfirmation(transactionReceipt)
    }
    catch (error) {
      if (notificationId) {
        notification.remove(notificationId)
      }
      console.error('⚡️ ~ file: useTransactor.ts ~ error', error)
      const message = getParsedError(error)
      notification.error(message)
      throw error
    }
    return transactionHash
  }
  return result
}
