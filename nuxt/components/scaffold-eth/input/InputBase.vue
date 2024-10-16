<script setup lang="ts">
import type { CommonInputProps } from './utils'

type InputBaseProps = CommonInputProps & {
  error?: boolean
  reFocus?: boolean
}

const props = defineProps<InputBaseProps>()

const inputRef = ref<HTMLInputElement>()

const model = defineModel<string | bigint>()

watch(() => props.reFocus, () => {
  if (props.reFocus !== undefined && props.reFocus === true) {
    inputRef.value?.focus()
  }
})
</script>

<template>
  <div
    class="flex border-2 border-base-300 bg-base-200 rounded-full text-accent"
    :class="{ 'border-error': error, 'bg-base-300': disabled }"
  >
    <slot name="prefix" />
    <input
      ref="inputRef"
      v-model="model"
      class="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
      :placeholder
      :name
      :disabled
      autocomplete="off"
    >
    <slot name="suffix" />
  </div>
</template>
