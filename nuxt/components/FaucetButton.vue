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

const { address, chain: connedtedChain } = useAccount()

const { data: balance } = useWatchBalance({ address })

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
    v-if="connedtedChain?.id === hardhat.id"
    class="relative"
  >
    <div
      v-if="isBalanceZero"
      class="ml-1 tooltip tooltip-bottom tooltip-secondary tooltip-open font-bold before:left-auto before:transform-none before:content-[attr(data-tip)] before:right-0"
      data-tip="Grab funds from faucet"
    >
      <!-- <div border="6px solid gray-800" absolute right-10% h-0 w-0 transform-rotate-45 -top-3px /> -->
      <UButton
        class="color-gray"
        :loading="loading"
        :disabled="loading"
        icon="i-fa-solid-faucet"
        cvariant="solid" @click="sendETH"
      />
    </div>
  </div>
</template>
