<script setup lang="ts">
import type { ContractName } from '~/utils/scaffold-eth/contract'
import { getAllContracts } from '~/utils/scaffold-eth/contractsData'

const selectedContractStorageKey = 'scaffoldEthVue.selectedContract'
const contractsData = getAllContracts()
const contractNames = Object.keys(contractsData) as ContractName[]

const selectedContract = useLocalStorage(selectedContractStorageKey, contractNames[0])
</script>

<template>
  <div class="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
    <p v-if="contractNames.length === 0" class="text-3xl mt-14">
      No contracts found!
    </p>
    <div class="flex flex-row gap-2 w-full max-w-7xl pb-1 px-6 lg:px-10 flex-wrap">
      <button
        v-for="contractName of contractNames"
        :key="contractName"
        class="btn btn-secondary btn-sm font-light hover:bg-transparent"
        :class="[
          selectedContract === contractName
            ? 'bg-base-300 hover:bg-base-300 no-animation'
            : 'bg-base-100 hover:bg-secondary',
        ]"
        @click="() => selectedContract = contractName"
      >
        {{ contractName }}
        <span
          v-if="contractsData[contractName].external"
          class="tooltip tooltip-top tooltip-accent"
          data-tip="External contract"
        >
          <Icon name="i-uil-comment-exclamation" />
        </span>
      </button>
    </div>
    <ContractUI
      v-for="contractName in contractNames"
      :key="contractName"
      :contract-name
      :class="[
        contractName === selectedContract
          ? 'null' : 'hidden',
      ]"
    />
  </div>
</template>
