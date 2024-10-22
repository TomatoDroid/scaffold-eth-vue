<script setup lang="tsx">
import type { AbiParameter } from 'viem'
import AddressInput from '../input/AddressInput.vue'
import Bytes32Input from '../input/Bytes32Input.vue'
import InputBase from '../input/InputBase.vue'
import BytesInput from '../input/BytesInput.vue'
import Tuple from '../Tuple.vue'
import IntegerInput from '../input/IntegerInput.vue'
import TupleArray from '../TupleArray.vue'
import type { IntegerVariant } from '../input/utils'
import type { AbiParameterTuple } from '~/utils/scaffold-eth/contract'

interface ContractInputProps {
  stateObjectKey: string
  paramType: AbiParameter
}

const { stateObjectKey, paramType } = defineProps<ContractInputProps>()

const inputAttr = ref({
  name: stateObjectKey,
  placeholder: paramType.name
    ? `${paramType.type} ${paramType.name}`
    : paramType.type,
})

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const model = defineModel<Record<string, any>>()

const computedModel = computed({
  get() {
    return model.value?.[stateObjectKey]
  },
  set(value) {
    if (model.value) {
      model.value = { ...model.value, [stateObjectKey]: value }
    }
    else {
      model.value = { [stateObjectKey]: value }
    }
  },
})

function RenderInput() {
  switch (paramType.type) {
    case 'address':
      return <AddressInput v-model={computedModel.value} {...inputAttr.value} />
    case 'bytes32':
      return <Bytes32Input v-model={computedModel.value} {...inputAttr.value} />
    case 'bytes':
      return <BytesInput v-model={computedModel.value} {...inputAttr.value} />
    case 'string':
      return <InputBase v-model={computedModel.value} {...inputAttr.value} />
    case 'tuple':
      return (
        <Tuple
          v-model:form={model.value}
          abiTupleParameter={paramType as AbiParameterTuple}
          parentStateObjectKey={stateObjectKey}
        />
      )
    default:
      if (paramType.type.includes('int') && !paramType.type.includes('[')) {
        return (
          <IntegerInput
            v-model={computedModel.value}
            {...inputAttr.value}
            variant={paramType.type as IntegerVariant}
          />
        )
      }
      // biome-ignore lint/style/noUselessElse: <explanation>
      else if (paramType.type.startsWith('tuple[')) {
        return <TupleArray />
      }
      // biome-ignore lint/style/noUselessElse: <explanation>
      else {
        return <InputBase v-model={computedModel.value} {...inputAttr.value} />
      }
  }
}
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <div class="flex items-center ml-2">
      <span v-if="paramType.name" class="text-xs font-medium mr-2 leading-none">
        {{ paramType.name }}
      </span>
      <span class="block text-xs font-extralight leading-none">
        {{ paramType.type }}
      </span>
    </div>
    <RenderInput />
  </div>
</template>
