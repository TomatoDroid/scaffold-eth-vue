import type { TransactionReceipt } from "viem";

export type TransactorFuncOptions = {
    onBlockConfirmation?: (txnReceipt: TransactionReceipt) => void;
    blockConfirmations?: number,
}