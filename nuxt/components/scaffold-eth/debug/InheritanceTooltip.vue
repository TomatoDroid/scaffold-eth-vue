<script setup lang="ts">
defineProps<{
  inheritedForm?: string
}>()
</script>

<template>
  <span
    class="tooltip tooltip-top tooltip-accent px-2 md:break-normal"
    :data-tip="`Inherited from: ${inheritedForm}`"
  >
    <Icon name="i-uil-exclamation-circle" class="w-4 h-4" />
  </span>
</template>
