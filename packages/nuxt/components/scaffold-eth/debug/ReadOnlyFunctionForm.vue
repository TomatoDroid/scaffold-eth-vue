<script setup lang="tsx">
import type { Abi, AbiFunction, Address } from 'viem'
import { useReadContract } from '@wagmi/vue'
import InheritanceTooltip from './InheritanceTooltip.vue'
import DisplayTxResult from './DisplayTxResult.vue'
import { notification } from './nitification'
import ContractInput from './ContractInput.vue'
import { getFunctionInputKey, getInitialFormState, getParsedContractFunctionArgs, transformAbiFunction } from '~/utils/scaffold-eth/utilsContract'
import { getParsedError } from '~/utils/scaffold-eth/getParseError'

interface ReadOnlyFunctionFormProps {
  contractAddress: Address
  abiFunction: AbiFunction
  inheritedForm?: string
  abi: Abi
}

const props = defineProps<ReadOnlyFunctionFormProps>()

const form = ref(getInitialFormState(props.abiFunction))
const result = ref()
const { targetNetwork } = useTargetNetwork()

const { isFetching, refetch, error } = useReadContract({
  address: props.contractAddress,
  functionName: props.abiFunction.name,
  abi: props.abi,
  args: getParsedContractFunctionArgs(form.value),
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  chainId: targetNetwork.value.id as any,
  query: {
    enabled: false,
    retry: false,
  },
})

watch(error, () => {
  if (error.value) {
    const parseError = getParsedError(error.value)
    notification.error(parseError)
  }
})

const transformFunction = transformAbiFunction(props.abiFunction)

function InputElements() {
  return transformFunction.inputs.map((input, index) => {
    const key = getFunctionInputKey(props.abiFunction.name, input, index)
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

async function handleClick() {
  const { data } = await refetch()
  result.value = data
}

watch(form, () => {
  result.value = undefined
})
</script>

<template>
  <div class="flex flex-col gap-3 py-5 first:pt-0 last:pb-1">
    <div class="font-medium my-0 break-words">
      {{ abiFunction.name }}
      <InheritanceTooltip :inherited-form="inheritedForm" />
    </div>
    <InputElements />
    <div class="flex flex-col md:flex-row justify-between gap-2 flex-wrap">
      <div class="flex-grow w-full md:max-w-[80%]">
        <div
          v-if="result !== null && result !== undefined"
          class="bg-secondary rounded-3xl text-sm px-4 py-1.5 break-words overflow-auto"
        >
          <p class="font-bold m-0 mb-1">
            Result:
          </p>
          <pre class="whitespace-pre-wrap break-words">
            <DisplayTxResult :display-content="result" font-size="sm" />
          </pre>
        </div>
      </div>
      <button
        class="btn btn-secondary btn-sm self-end md:self-start"
        :disabled="isFetching"
        @click="handleClick"
      >
        Read 📡
      </button>
    </div>
  </div>
</template>
