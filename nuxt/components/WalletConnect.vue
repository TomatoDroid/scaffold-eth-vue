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
    [{
        label: 'Disconnect',
        icon: 'i-heroicons-x-circle',
        click: () => disconnect(),
        slot: 'account'
    },]
])

</script>

<template>
    <div>
        <div flex="~ justify-center items-center gap-1">
            <w3m-button/>
            <FaucetButton />
        </div>
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