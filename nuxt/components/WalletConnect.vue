<script setup lang="ts">
import { useAccount } from '@wagmi/vue'

const networkColor = useNetworkColor()
const { targetNetwork } = useTargetNetwork()

const { address, isConnected } = useAccount()
</script>

<template>
  <div class="flex justify-center items-center gap-1">
    <div v-if="isConnected" class="flex flex-col items-center mr-1">
      <Balance :address />
      <span class="text-xs" :style="{ color: networkColor }">
        {{ targetNetwork.name }}
      </span>
    </div>
    <w3m-button balance="false" />
    <FaucetButton v-if="isConnected" />
  </div>
</template>
