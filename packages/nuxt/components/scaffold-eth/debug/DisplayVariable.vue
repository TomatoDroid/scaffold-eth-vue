<script setup lang="ts">
import type { Abi, AbiFunction, Address } from 'viem'
// TODO autoimport https://github.com/wevm/wagmi/issues/3977
import { useReadContract } from '@wagmi/vue'
import { notification } from './nitification'
import { getParsedError } from '~/utils/scaffold-eth/getParseError'

interface DisplayVariableProps {
  contractAddress: Address
  abiFunction: AbiFunction
  refreshDisplayVariables: boolean
  inheritedForm?: string
  abi: Abi
}

const props = defineProps<DisplayVariableProps>()

const { targetNetwork } = useTargetNetwork()

const { data: result, isFetching, refetch, error } = useReadContract({
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  address: props.contractAddress as any,
  functionName: props.abiFunction.name,
  abi: props.abi,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  chainId: targetNetwork.value.id as any,
  query: {
    retry: false,
  },
})

const { showAnimation } = useAnimationConfig(result)

watch(() => props.refreshDisplayVariables, () => {
  refetch()
})

watch(error, () => {
  if (error.value) {
    const parsedError = getParsedError(error)
    notification.error(parsedError)
  }
})
</script>

<template>
  <!-- <Toast /> -->
  <div class="space-y-1 pb-2">
    <div class="flex items-center">
      <h3 class="font-medium text-lg mb-0 break-all">
        {{ abiFunction.name }}
      </h3>
      <button class="btn btn-ghost btn-xs">
        <span v-if="isFetching" class="loading loading-spinner loading-xs" />
        <Icon v-else name="i-uil-sync" class="h-3 w-3 cursor-pointer" aria-hidden="true" />
      </button>
      <InheritanceTooltip :inherited-form />
    </div>
    <div class="text-gray-500 font-medium flex flex-col items-start">
      <div>
        <div
          class=" break-all block transition bg-transparent"
          :class="[showAnimation ? 'bg-warning rounded-sm animate-pulse-fast' : '']"
        >
          <DisplayTxResult :display-content="result" />
        </div>
      </div>
    </div>
  </div>
</template>
