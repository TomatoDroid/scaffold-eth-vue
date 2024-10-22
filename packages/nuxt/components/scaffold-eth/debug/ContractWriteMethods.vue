<script setup lang="ts">
import type { AbiFunction } from 'viem'
import type { Contract, ContractName, InheritedFunctions } from '~/utils/scaffold-eth/contract'

const { deployedContractData } = defineProps<{
  deployedContractData: Contract<ContractName>
}>()

defineEmits(['change'])

const functionsToDisplay = computed(() => {
  return ((deployedContractData.abi.filter(part => part.type === 'function')) as AbiFunction[])
    .filter(fn => fn.stateMutability !== 'view' && fn.stateMutability !== 'pure')
    .map(fn => ({
      fn,
      inheritedFrom: (deployedContractData.inheritedFunctions as InheritedFunctions)?.[fn.name],
    }))
    .sort((a, b) => b.inheritedFrom ? b.inheritedFrom.localeCompare(a.inheritedFrom) : 1)
})
</script>

<template>
  <div v-if="!functionsToDisplay.length">
    No write methods
  </div>
  <WriteOnlyFunctionForm
    v-for="({ fn, inheritedFrom }, index) in functionsToDisplay"
    v-else
    :key="`${fn.name}-${index}`"
    :abi="deployedContractData.abi"
    :abi-function="fn"
    :contract-address="deployedContractData.address"
    :inherited-from="inheritedFrom"
    @change="$emit('change')"
  />
</template>
