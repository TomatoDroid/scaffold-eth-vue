<script setup lang="ts">
import type { ContractName } from '~/utils/scaffold-eth/contract'
import { getAllContracts } from '~/utils/scaffold-eth/contractsData'

const selectedContractStorageKey = 'scaffoldEthVue.selectedContract'
const contractsData = getAllContracts()
const contractNames = Object.keys(contractsData) as ContractName[]
</script>

<template>
  <div class="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
    <p v-if="contractNames.length === 0" class="text-3xl mt-14">
      No contracts found!
    </p>
    <div class="flex flex-row gap-2 w-full max-w-7xl pb-1 px-6 lg:px-10 flex-wrap">
      <button />
    </div>
  </div>
</template>
