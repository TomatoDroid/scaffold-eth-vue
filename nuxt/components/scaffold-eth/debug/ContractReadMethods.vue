<script setup lang="ts">
import type { AbiFunction } from 'viem'
import type { Contract, ContractName, GenericContract, InheritedFunctions } from '~/utils/scaffold-eth/contract'

const props = defineProps<{
  deployedContractData: Contract<ContractName>
}>()

const functionsToDisplay = computed(() => {
  return ((props.deployedContractData.abi.filter(part => part.type === 'function')) as AbiFunction[])
    .filter(fn => (fn.stateMutability === 'view' || fn.stateMutability === 'pure') && fn.inputs.length > 0)
    .map(fn => ({
      fn,
      inheritedForm: ((props.deployedContractData as GenericContract)?.inheritedFunctions as InheritedFunctions)?.[fn.name],
    }))
    .sort((a, b) => (b.inheritedForm ? b.inheritedForm.localeCompare(a.inheritedForm) : 1))
})
</script>

<template>
  <template v-if="functionsToDisplay.length">
    <ReadOnlyFunctionForm
      v-for="{ fn, inheritedForm } of functionsToDisplay "
      :key="fn.name"
      :contract-address="deployedContractData.address"
      :abi-function="fn"
      :abi="deployedContractData.abi"
      :inherited-form="inheritedForm"
    />
  </template>
  <div v-else>
    No read methods
  </div>
</template>
