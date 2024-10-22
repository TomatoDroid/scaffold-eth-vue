<script setup lang="ts">
import { hexToString, isHex, stringToHex } from 'viem'
import InputBase from './InputBase.vue'
import type { CommonInputProps } from './utils'

defineProps<CommonInputProps>()

const model = defineModel<string>()

function convertStringToBytes32() {
  if (!model.value) {
    return
  }
  const value = isHex(model.value)
    ? hexToString(model.value, { size: 32 })
    : stringToHex(model.value as string, { size: 32 })
  model.value = value
}
</script>

<template>
  <InputBase
    v-model="model"
    v-bind="$props"
  >
    <template #suffix>
      <div
        class="self-center cursor-pointer text-xl font-semibold px-4 text-accent"
        @click="convertStringToBytes32"
      >
        #
      </div>
    </template>
  </InputBase>
</template>
