<script setup lang="ts">
import { useAccount } from '@wagmi/vue'

const { address: connectedAddress } = useAccount()
</script>

<template>
  <div class="flex items-center flex-col flex-grow pt-10">
    <div class="px-5">
      <h1 class="text-center">
        <span class="block text-2xl mb-2">Welcome to</span>
        <span class="block text-4xl font-bold">Scaffold-ETH-<span class="text-green-400">VUE</span></span>
      </h1>
      <div class="flex items-center justify-center space-x-2 flex-col sm:flex-row">
        <p class="my-2 font-medium">
          Connected Address:
        </p>
        <Address :address="connectedAddress" />
      </div>
      <p class="text-center text-lg">
        Get started by editing
        <code class="italic bg-base-300 text-base max-w-full break-words inline-block">
          nuxt/pages/index.vue
        </code>
      </p>
      <p class="text-center text-lg">
        Edit your smart contract
        <code class="italic bg-base-300 text-base max-w-full break-words inline-block">
          YourContract.sol
        </code>
        in
        <code class="italic bg-base-300 text-base max-w-full break-words inline-block">
          hardhat/contracts
        </code>
      </p>
    </div>
    <div class="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
      <div class="flex justify-center items-center gap-12 flex-col sm:flex-row">
        <div class="flex flex-col items-center text-center bg-base-100 p-10 max-w-xs rounded-3xl">
          <Icon name="i-uil-bug" />
          <p>
            Tinker with your smart contract using the
            <NuxtLink to="/debug" class="link">
              Debug Contracts
            </NuxtLink>
            tab.
          </p>
        </div>
        <div class="flex flex-col items-center text-center bg-base-100 p-10 max-w-xs rounded-3xl">
          <Icon name="i-uil-search" />
          <p>
            Explore your local transactions with the
            <NuxtLink to="/blockexplorer" class="link">
              Block Explorer
            </NuxtLink>
            tab.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
