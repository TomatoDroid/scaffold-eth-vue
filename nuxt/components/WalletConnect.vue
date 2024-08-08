<script setup lang="ts">
import { useAccount, useConnect, useDisconnect, useEnsName, useChainId, type Connector } from '@wagmi/vue';

const chainId = useChainId()
const { isConnected, address } = useAccount()
const { connect, connectors } = useConnect()
const { disconnect } = useDisconnect()

const { data: ensName } = useEnsName({ address })

const isOpen = ref(false)

const displayAddress = computed(() => {
    if (ensName.value) return ensName.value
    if (address.value) return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`
    return ''
})
const handleConnect = (connector: Connector) => {
    connect({ connector, chainId: chainId.value })
    isOpen.value = false
}

const items = ref([
    [],
    [{
        label: 'Disconnect',
        icon: 'i-heroicons-x-circle',
        click: () => disconnect(),
    },]
])

</script>

<template>
    <div>
        <UButton v-if="!isConnected" @click="isOpen = true">
            Connect Wallet
        </UButton>
        <UDropdown v-else :items="items" mode="hover">
            <UButton color="white" >
                <span>{{ displayAddress }}</span>
            </UButton>
        </UDropdown>
        <UModal v-model="isOpen">
            <div p-4>
                <div mb-4 v-for="connector in connectors" :key="connector.id">
                    <UButton @click="handleConnect(connector)">
                        {{ connector.name }}
                    </UButton>
                </div>
            </div>
        </UModal>
    </div>
</template>