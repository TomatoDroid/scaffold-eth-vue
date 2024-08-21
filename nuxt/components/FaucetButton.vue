<script setup lang="ts">
import { createWalletClient, http, parseEther, formatEther } from 'viem';
import { hardhat } from 'viem/chains';
import { useAccount, useBalance } from '@wagmi/vue'

const NUM_OF_ETH = "1";
const FAUCET_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

const localWalletClient = createWalletClient({
    chain: hardhat,
    transport: http()
})

const { address, chain: connedtedChain } = useAccount()

const { data: balance } = useWatchBalance({ address })

const com = computed(() =>  balance.value && formatEther(balance.value.value))

const faucetTxn = useTransactor(localWalletClient)

const loading = ref(false)

const sendETH = async () => {
    if (!address.value) {
        return
    }
    try {
        loading.value = true
        await faucetTxn({
            account: FAUCET_ADDRESS,
        to: address.value,
            value: parseEther(NUM_OF_ETH)
        })
    } catch (error) {
        console.error("⚡️ ~ file: FaucetButton.vue:sendETH ~ error", error);
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div v-if="connedtedChain?.id === hardhat.id">
        <UButton 
            :loading="loading"
            icon="i-fa-solid-faucet" 
            color="gray" variant="solid" @click="sendETH" 
        />
        balance: {{ com }}
    </div>
</template>
