<script setup lang="ts">
import type { Abi, AbiFunction } from 'viem'
import type { Contract, ContractName, GenericContract, InheritedFunctions } from '~/utils/scaffold-eth/contract'

const props = defineProps<{
  refreshDisplayVariables: boolean
  deployedContractData: Contract<ContractName>
}>()

const functionsToData = computed(() => {
  return ((props.deployedContractData.abi as Abi).filter(part => part.type === 'function') as AbiFunction[])
    .filter(fn => (fn.stateMutability === 'view' || fn.stateMutability === 'pure') && fn.inputs.length === 0)
    .map(fn => ({
      fn,
      inheritedFrom: ((props.deployedContractData as GenericContract)?.inheritedFunctions as InheritedFunctions)?.[fn.name],
    }))
    .sort((a, b) => b.inheritedFrom ? b.inheritedFrom.localeCompare(a.inheritedFrom) : 1)
})
</script>

<template>
  <div v-if="!functionsToData.length">
    No contract variables
  </div>
  <DisplayVariable
    v-for="{ fn, inheritedFrom } in functionsToData"
    v-else
    :key="fn.name"
    :abi-function="fn"
    :abi="deployedContractData.abi"
    :contract-address="deployedContractData.address"
    :refresh-display-variables="refreshDisplayVariables"
    :inherited-form="inheritedFrom"
  />
</template>
