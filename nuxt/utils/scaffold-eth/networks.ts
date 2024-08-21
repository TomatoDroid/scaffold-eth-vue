import * as chains from '@wagmi/vue/chains'
import scaffoldConfig from '../../scaffold.config'

type ChainAttributes = {
    // color | [lightThemeColor, darkThemeColor]
    color: string | [string, string];
    // Used to fetch price by providing mainnet token address
  // for networks having native currency other than ETH
  nativeCurrencyTokenAddress?: string;
}

export type ChainWithAttributes = chains.Chain & Partial<ChainAttributes>    

// Mapping of chainId to RPC chain name an format followed by alchemy and infura
export const RPC_CHAIN_NAME: Record<number, string> = {
    [chains.mainnet.id]: "mainnet",
    [chains.sepolia.id]: "sepolia",
    [chains.holesky.id]: "holesky",
}

export const getInfuraHttpUrl = (chainId: number) => {
    return RPC_CHAIN_NAME[chainId]
        ? `https://${RPC_CHAIN_NAME[chainId]}.infura.io/v3/${scaffoldConfig.infuraApiKey}`
        : undefined
}

export const NETWORKS_EXTRA_DATA: Record<string, ChainAttributes> = {
    [chains.hardhat.id]: {
      color: "#b8af0c",
    },
    [chains.mainnet.id]: {
      color: "#ff8b9e",
    },
    [chains.sepolia.id]: {
      color: ["#5f4bb6", "#87ff65"],
    },
    [chains.gnosis.id]: {
      color: "#48a9a6",
    },
    [chains.polygon.id]: {
      color: "#2bbdf7",
      nativeCurrencyTokenAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    },
    [chains.polygonMumbai.id]: {
      color: "#92D9FA",
      nativeCurrencyTokenAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    },
    [chains.optimismSepolia.id]: {
      color: "#f01a37",
    },
    [chains.optimism.id]: {
      color: "#f01a37",
    },
    [chains.arbitrumSepolia.id]: {
      color: "#28a0f0",
    },
    [chains.arbitrum.id]: {
      color: "#28a0f0",
    },
    [chains.fantom.id]: {
      color: "#1969ff",
    },
    [chains.fantomTestnet.id]: {
      color: "#1969ff",
    },
    [chains.scrollSepolia.id]: {
      color: "#fbebd4",
    },
};

/**
 * Gives the block explorer transaction URL, returns empty string if the network is a local chain
 */
export function getBlockExplorerTxLink (chainId: number, txHash: string) {
    const chainNames = Object.keys(chains)
    const targetChainArr = chainNames.filter(chainName => {
        return chains[chainName as keyof typeof chains].id === chainId
    })

    if (targetChainArr.length === 0) {
        return ''
    }

    const targetChain = targetChainArr[0] as keyof typeof chains
    const blockExplorerTxURL = chains[targetChain].blockExplorers?.default.url

    if (!blockExplorerTxURL) {
        return ''
    }

    return `https://${blockExplorerTxURL}/tx/${txHash}`
}