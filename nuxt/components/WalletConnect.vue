<script setup lang="ts">
import { type Connector, useChainId, useConnect } from '@wagmi/vue'

const chainId = useChainId()
const { connect, connectors } = useConnect()
const isOpen = ref(false)

function handleConnect(connector: Connector) {
  connect({ connector, chainId: chainId.value })
  isOpen.value = false
}
</script>

<template>
  <div>
    <div class="flex justify-center items-center gap-1">
      <w3m-button balance="false" />
      <FaucetButton />
    </div>
  </div>
</template>
