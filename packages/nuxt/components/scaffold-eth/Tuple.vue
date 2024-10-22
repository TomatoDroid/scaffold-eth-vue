<script setup lang="tsx">
import ContractInput from './debug/ContractInput.vue'
import { replacer } from '~/utils/scaffold-eth/common'
import type { AbiParameterTuple } from '~/utils/scaffold-eth/contract'
import { getFunctionInputKey, getInitialTupleFormState } from '~/utils/scaffold-eth/utilsContract'

interface TupleProps {
  abiTupleParameter: AbiParameterTuple
  parentStateObjectKey: string
}

const { abiTupleParameter, parentStateObjectKey } = defineProps<TupleProps>()

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const model = defineModel<Record<string, any>>('form')

const form = ref(getInitialTupleFormState(abiTupleParameter))
const replaceForm = computed(() => JSON.stringify(form.value, replacer))

watch(replaceForm, (val) => {
  const vlaues = Object.values(val)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const argsStruct: Record<string, any> = {}
  abiTupleParameter.components.forEach((components, index) => {
    argsStruct[components.name || `input_${index}_`] = vlaues[index]
  })

  model.value = { ...model.value, [parentStateObjectKey]: JSON.stringify(argsStruct, replacer) }
})

function ContractInputList() {
  return abiTupleParameter.components.map((param, index) => {
    const key = getFunctionInputKey(abiTupleParameter.name || 'tuple', param, index)
    return (
      <ContractInput
        key={key}
        stateObjectKey={key}
        paramType={param}
        v-model={form.value}
      />
    )
  })
}
</script>

<template>
  <div class="collapse collapse-arrow bg-base-300 pl-4 py-1.5 border-2 border-secondary">
    <input type="checkbox" class="min-h-fit peer">
    <div class="collapse-title p-0 min-h-fit peer-checked:mb-2 text-primary-content/50">
      <p class="m-0 p-0 text-[1rem]">
        {{ abiTupleParameter.internalType }}
      </p>
    </div>
    <div class="ml-3 flex-col space-y-4 border-secondary/80 border-l-2 pl-4 collapse-content">
      <ContractInputList />
    </div>
  </div>
</template>
