import { http, createConfig, type CreateConnectorFn } from "@wagmi/vue";
import { hardhat, mainnet, type Chain } from '@wagmi/vue/chains'
import { walletConnect } from "@wagmi/vue/connectors";
import { burner } from 'burner-connector'
import scaffoldConfig from "./scaffold.config";
import { createClient } from "viem";
import { getInfuraHttpUrl } from "./utils/scaffold-eth/networks";
import { createWeb3Modal } from "@web3modal/wagmi/vue";
import { reconnect } from "@wagmi/vue/actions";
import * as chains from "viem/chains";

const projectId = '955b0dd66876a74598e25fd556d9c5c3'

const metadata = {
  name: 'scaffold-eth-vue',
  description: 'AppKit scaffold-eth-vue',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const { targetNetworks, onlyLocalBurnerWallet } = scaffoldConfig

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const enabledChains = targetNetworks.find((network: Chain) => network.id === 1)
  ? targetNetworks
  : ([...targetNetworks, mainnet] as const)

const wagmiConnectors = [
  walletConnect({ projectId, metadata, showQrModal: false }), 
  ...(!targetNetworks.some(network => network.id !== (chains.hardhat as chains.Chain).id) || !onlyLocalBurnerWallet
    ? [burner()]
    : []),
] as CreateConnectorFn[];

export const config = createConfig({
  chains: enabledChains,
  ssr: true,
  connectors: wagmiConnectors,
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

reconnect(config)

const modal = createWeb3Modal({
  projectId,
  // @ts-ignore
  wagmiConfig: config,
})

declare module '@wagmi/vue' {
  interface Register {
    config: typeof config
  }
}