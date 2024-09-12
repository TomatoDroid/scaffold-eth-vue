<script setup lang="ts">
import { createWalletClient, http, parseEther } from 'viem'
import { hardhat } from 'viem/chains'
import { useAccount } from '@wagmi/vue'

const NUM_OF_ETH = '1'
const FAUCET_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

const localWalletClient = createWalletClient({
  chain: hardhat,
  transport: http(),
})

const { address } = useAccount()

const { data: balance } = useWatchBalance({ address: address.value })

const faucetTxn = useTransactor(localWalletClient)

const loading = ref(false)

async function sendETH() {
  if (!address.value) {
    return
  }
  try {
    loading.value = true
    await faucetTxn({
      account: FAUCET_ADDRESS,
      to: address.value,
      value: parseEther(NUM_OF_ETH),
    })
  }
  catch (error) {
    console.error('⚡️ ~ file: FaucetButton.vue:sendETH ~ error', error)
  }
  finally {
    loading.value = false
  }
}

const isBalanceZero = computed(() => {
  return balance.value && balance.value.value === 0n
})
</script>

<template>
  <div
    :class="[
      !isBalanceZero
        ? 'ml-1'
        : 'ml-1 tooltip tooltip-bottom tooltip-secondary tooltip-open font-bold before:left-auto before:transform-none before:right-0']"
    data-tip="Grab funds from faucet"
  >
    <button
      class="btn btn-secondary btn-sm px-2 rounded-full"
      :disabled="loading"
      @click="sendETH"
    >
      <span v-if="loading" class="loading loading-spainner loading-xs" />
      <Icon v-else name="i-uil-bill" class="h-4 w-4" />
    </button>
  </div>
</template>
