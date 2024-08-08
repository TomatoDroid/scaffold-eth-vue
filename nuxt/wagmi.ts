import { http, createConfig } from "@wagmi/vue";
import { base, mainnet, sepolia } from '@wagmi/vue/chains'
import { injected, metaMask, walletConnect, safe } from "@wagmi/vue/connectors";

// TODO
const projectId = '3a8170812b534d0ff9d794f19a901d64'

export const config = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [
    injected(),
    // walletConnect({projectId}),
    metaMask(),
    safe()
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
  }
});

declare module '@wagmi/vue' {
  interface Register {
    config: typeof config
  }
}