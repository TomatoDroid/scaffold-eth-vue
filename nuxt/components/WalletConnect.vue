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
        <UButton v-if="!isConnected" @click="isOpen = true">
            Connect Wallet
        </UButton>
        <div v-else flex="~ items-center gap-2">
            <div flex="~ col items-center" text-xs mr-2>
                <span cursor-pointer>
                    0.0000
                    <span font-bold>ETH</span>
                </span>
                <span>Hardhat</span>
            </div>
            <UDropdown :items="items">
                <UButton color="white" trailing-icon="i-heroicons-chevron-down-20-solid">
                    <span>{{ displayAddress }}</span>
                </UButton>
                <template #account="{ item }">
                    <div flex="~ items-center gap-2" text-red-4>
                        <UIcon w-5 h-5 :name="item.icon" />
                        <span>{{ item.label }}</span>
                    </div>
                </template>
            </UDropdown>
            <!-- <FaucetButton /> -->
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