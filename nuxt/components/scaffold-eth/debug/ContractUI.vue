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
      <div class="col-span-1 lg:col-span-2 flex flex-col gap-6">
        <div class="z-10">
          <div class="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
            <div class="h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
              <div class="flex items-center justify-center space-x-2">
                <p class="my-0 text-sm">
                  Read
                </p>
              </div>
            </div>
            <div class="p-5 divide-y divide-base-300">
              <ContractReadMethods :deployed-contract-data />
            </div>
          </div>
        </div>
        <div class="z-10">
          <div class="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
            <div class="h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
              <div class="flex items-center justify-center space-x-2">
                <p class="my-0 text-sm">
                  Write
                </p>
              </div>
            </div>
            <div class="p-5 divide-y divide-base-300">
              ContractWriteMethods
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
