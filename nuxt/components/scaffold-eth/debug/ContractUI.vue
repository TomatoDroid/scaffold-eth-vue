<script setup lang="ts">
import type { ContractName } from '~/utils/scaffold-eth/contract'

const props = defineProps<{
  contractName: ContractName
}>()

const { targetNetwork } = useTargetNetwork()
const networkColor = useNetworkColor()
const { data: deployedContractData, isLoading: deployedContractDataLoading } = useDeployedContractInfo(props.contractName)
</script>

<template>
  <div v-if="deployedContractDataLoading" class="mt-14">
    <span class="loading loading-spinner loading-lg" />
  </div>
  <p v-else-if="!deployedContractData" class="text-3xl mt-14">
    {{ `No contract found by the name of "${contractName}" on chain "${targetNetwork.name}"!` }}
  </p>
  <div v-else class="grid grid-cols-1 lg:grid-cols-6 px-6 lg:px-10 lg:gap-12 w-full max-w-7xl my-0">
    <div class="col-span-5 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
      <div class="col-span-1 flex flex-col">
        <div class="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 mb-6 space-y-1 py-4">
          <div class="flex">
            <div class="flex flex-col gap-1">
              <span class="font-bold">{{ contractName }}</span>
              <Address :address="deployedContractData.address" />
              <div class="flex gap-1 items-center">
                <span class="font-bold text-sm">Balance:</span>
                <Balance
                  :address="deployedContractData.address"
                  class="px-0 h-1.5 max-height-[0.375rem]"
                />
              </div>
            </div>
          </div>
          <p v-if="targetNetwork" class="my-0 text-sm gap-1 flex">
            <span class="font-bold">network:</span>
            <span :style="{ color: networkColor }">{{ targetNetwork.name }}</span>
          </p>
        </div>
        <div class="bg-base-300 rounded-3xl px-6 lg:px-8 py-4 shadow-lg shadow-base-300">
          <ContractVariables
            :refresh-display-variables="true"
            :deployed-contract-data="deployedContractData"
          />
        </div>
      </div>
    </div>
  </div>
</template>
