<script setup lang="ts">
import { type Address, formatEther } from 'viem'

interface BalanceProps {
  address?: Address
  className?: string
  usdMode?: boolean
}

const props = defineProps<BalanceProps>()

const { targetNetwork } = useTargetNetwork()

const { nativeCurrency } = storeToRefs(useGlobalStore())

const watchAddress = computed(() => props.address)

const { data: balance, isError, isLoading } = useWatchBalance({ address: watchAddress })

const displayUsdMode = ref(props.usdMode)

function toggleDisplayUsdMode() {
  displayUsdMode.value = !displayUsdMode.value
}

const formatterBalance = computed(() => {
  return balance.value ? Number(formatEther(balance.value.value)) : 0
})
</script>

<template>
  <div v-if="isError" class="border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer">
    <div className="text-warning">
      Error
    </div>
  </div>
  <div
    v-else-if="!address || isLoading || balance === null || (nativeCurrency.isFetching && nativeCurrency.price === 0)"
    class="animate-pulse flex space-x-4"
  >
    <div class="rounded-md bg-slate-300 h-6 w-6" />
    <div class="flex items-center space-y-6">
      <div class="h-2 w-28 bg-slate-300 rounded" />
    </div>
  </div>
  <button
    v-else
    class="btn btn-sm btn-ghost flex items-center hover:bg-transparent"
    @click="toggleDisplayUsdMode"
  >
    <div class="w-full">
      <div v-if="displayUsdMode" class="flex items-center justify-center">
        <span class="text-[0.8em] font-bold mr-1">$</span>
        <span>{{ formatterBalance * nativeCurrency.price }}</span>
      </div>
      <div v-else class="flex items-center justify-center">
        <span>{{ formatterBalance.toFixed(4) }}</span>
        <span class="text-[0.8em] font-bold ml-1">{{ targetNetwork.nativeCurrency.symbol }}</span>
      </div>
    </div>
  </button>
</template>
