<script setup lang="tsx">
import type { Abi, AbiFunction, Address } from 'viem'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from '@wagmi/vue'
import IntegerInput from '../input/IntegerInput.vue'
import InheritanceTooltip from './InheritanceTooltip.vue'
import ContractInput from './ContractInput.vue'
import { getFunctionInputKey, getInitialFormState, getParsedContractFunctionArgs, transformAbiFunction } from '~/utils/scaffold-eth/utilsContract'

interface WriteOnlyFunctionFormProps {
  abi: Abi
  abiFunction: AbiFunction
  contractAddress: Address
  inheritedFrom?: string
}
const { abiFunction, contractAddress, abi } = defineProps<WriteOnlyFunctionFormProps>()

const emit = defineEmits(['change'])

const form = ref(getInitialFormState(abiFunction))

const txValue = ref<string | bigint>('')
const writeTxn = useTransactor()

const { chain } = useAccount()
const { targetNetwork } = useTargetNetwork()
const writeDisabled = computed(() => {
  return !chain.value || chain.value?.id !== targetNetwork.value.id
})

const { data: result, isPending, writeContractAsync } = useWriteContract()

const transformedFunction = transformAbiFunction(abiFunction)
function RenderInputs() {
  return transformedFunction.inputs.map((input, index) => {
    const key = getFunctionInputKey(abiFunction.name, input, index)
    return (
      <ContractInput
        key={key}
        stateObjectKey={key}
        paramType={input}
        v-model={form.value}
      />
    )
  })
}

const zeroInputs = computed(() => {
  return transformedFunction.inputs.length === 0 && abiFunction.stateMutability !== 'payable'
})

const { data: txResult } = useWaitForTransactionReceipt({
  hash: result,
})

async function handleClick() {
  if (writeContractAsync) {
    try {
      const makeWriteWithParams = () => writeContractAsync({
        address: contractAddress,
        functionName: abiFunction.name,
        abi,
        args: getParsedContractFunctionArgs(form.value),
        value: BigInt(txValue.value),
      })
      await writeTxn(makeWriteWithParams)
      emit('change')
    }
    catch (e) {
      console.error('⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error', e)
    }
  }
}
</script>

<template>
  <div class="py-5 space-y-3 first:pt-0 last:pb-1">
    <div
      class="flex gap-3"
      :class="[zeroInputs ? 'flex-grow justify-between items-center' : 'flex-col']"
    >
      <p class="font-medium my-0 break-words">
        {{ abiFunction.name }}
        <InheritanceTooltip :inherited-from />
      </p>
      <RenderInputs />
      <div v-if="abiFunction.stateMutability === 'payable'" class="flex flex-col gap-1.5 w-full">
        <div class="flex items-center ml-2">
          <span class="text-xs font-medium mr-2 leading-none">
            payable value
          </span>
          <span class="block text-xs font-extralight leading-none">wei</span>
        </div>
        <IntegerInput v-model="txValue" placeholder="vlaue (wei)" />
      </div>
      <div class="flex justify-between gap-2">
        <div v-if="!zeroInputs" class="flex-grow basis-0">
          <TxReceipt v-if="txResult" :tx-result />
        </div>
        <div
          class="flex"
          :class="{ 'tooltip before:content-[attr(data-tip)] before:right-[-10px] before:left-auto before:transform-none': writeDisabled }"
          :data-tip="`${writeDisabled && 'Wallet not connected or in the wrong network'}`"
        >
          <button
            class="btn btn-secondary btn-sm"
            :disabled="writeDisabled || isPending"
            @click="handleClick"
          >
            <span v-if="isPending" class="loading loading-spinner loading-xs" />
            Send 💸
          </button>
        </div>
      </div>
    </div>
    <div v-if="zeroInputs && txResult" class="flex-grow basis-0">
      <TxReceipt :tx-result />
    </div>
  </div>
</template>
