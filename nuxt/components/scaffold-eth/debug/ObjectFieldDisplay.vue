<script setup lang="ts">
import type { DisplayContent, ResultFontSize } from './DisplayTxResult.vue'

defineProps<{
  name: string
  value: DisplayContent
  size: ResultFontSize
  leftPad?: boolean
}>()
</script>

<template>
  <div
    class="flex flex-row items-baseline"
    :class="[leftPad ? 'ml-4' : '']"
  >
    <span class="text-gray-500 dark:text-gray-400 mr-2">
      {{ name }}
    </span>
    <span class="text-base-content">
      <DisplayTxResult :display-content="value" :font-size="size" />
    </span>
  </div>
</template>
