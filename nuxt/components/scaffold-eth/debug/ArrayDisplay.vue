<script setup lang="ts">
import type { DisplayContent, ResultFontSize } from './DisplayTxResult.vue'

defineProps<{
  values: DisplayContent[]
  size: ResultFontSize
}>()
</script>

<template>
  <div class="flex flex-col gap-y-1">
    {{ values.length ? 'array' : '[]' }}
    <ObjectFieldDisplay
      v-for="(value, key) in values"
      :key="key" :name="`[${key}]`" :value="value" :size="size"
    />
  </div>
</template>
