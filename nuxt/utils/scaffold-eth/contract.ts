import type { TransactionReceipt } from 'viem'

export interface TransactorFuncOptions {
  onBlockConfirmation?: (txnReceipt: TransactionReceipt) => void
  blockConfirmations?: number
}
