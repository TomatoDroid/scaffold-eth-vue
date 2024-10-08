<script setup lang="ts">
import type { ResultFontSize } from './DisplayTxResult.vue'

defineProps<{
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  struct: Record<string, any>
  size: ResultFontSize
}>()
</script>

<template>
  <div class="flex flex-col gap-y-1">
    struct
    <ObjectFieldDisplay
      v-for="[k, v] in Object.entries(struct)"
      :key="k"
      :name="k"
      :value="v"
      :size="size"
    />
  </div>
</template>
