import { http, createConfig } from "@wagmi/vue";
import { base, hardhat, mainnet, sepolia, type Chain } from '@wagmi/vue/chains'
import { injected, metaMask, walletConnect, safe } from "@wagmi/vue/connectors";
import { burner } from 'burner-connector'
import scaffoldConfig from "./scaffold.config";
import { createClient } from "viem";
import { getInfuraHttpUrl } from "./utils/scaffold-eth/networks";

// TODO
const projectId = '3a8170812b534d0ff9d794f19a901d64'

const { targetNetworks } = scaffoldConfig

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const enabledChains = targetNetworks.find((network: Chain) => network.id === 1)
  ? targetNetworks
  : ([...targetNetworks, mainnet] as const)

export const config = createConfig({
  chains: enabledChains,
  ssr: true,
  connectors: [
    injected(),
    // walletConnect({projectId}),
    metaMask(),
    safe(),
    // @ts-ignore
    burner()
  ],
  client({ chain }) {
    return createClient({
      chain,
      transport: http(getInfuraHttpUrl(chain.id)),
      ...(chain.id !== hardhat.id
        ? {
            pollingInterval: scaffoldConfig.pollingInterval
          }
        : {})
    })
  }
});

declare module '@wagmi/vue' {
  interface Register {
    config: typeof config
  }
}