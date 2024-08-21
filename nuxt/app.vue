<script setup>
import "./assets/global.css"
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet, arbitrum, hardhat } from 'viem/chains'
import { reconnect } from '@wagmi/core'
import { useWeb3Modal } from '@web3modal/wagmi/vue'

// 1. Your WalletConnect Cloud project ID
const projectId = '955b0dd66876a74598e25fd556d9c5c3'

// 2. Create a metadata object
const metadata = {
  name: 'scaffold-eth-vue',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// 3. Create wagmiConfig
const chains = [mainnet, arbitrum]
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // ...wagmiOptions // Optional - Override createConfig parameters
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

onMounted(() => {
  reconnect(config)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <UNotifications :ui="{ strategy: 'override', position: 'top-0 left-50% translate-x-[-50%]' }"/>
</template>
