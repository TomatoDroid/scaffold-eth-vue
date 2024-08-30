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
    <UModal v-model="isOpen">
      <div class="p-4">
        <div v-for="connector in connectors" :key="connector.id" class="mb-4">
          <UButton @click="handleConnect(connector)">
            {{ connector.name }}
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
