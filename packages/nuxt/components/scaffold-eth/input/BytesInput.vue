<script setup lang="ts">
import { hexToString, isHex, stringToHex } from 'viem'
import InputBase from './InputBase.vue'
import type { CommonInputProps } from './utils'

defineProps<CommonInputProps>()

const model = defineModel<string>()

function convertStringToBytes() {
  if (!model.value) {
    return
  }
  const value = isHex(model.value)
    ? hexToString(model.value)
    : stringToHex(model.value as string)
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
        @click="convertStringToBytes"
      >
        #
      </div>
    </template>
  </InputBase>
</template>
