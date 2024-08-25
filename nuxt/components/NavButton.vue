<script setup lang="ts">
export interface NavItem {
  label: string
  icon?: string
  link: string
}

defineProps({
  item: {
    type: Object as PropType<NavItem>,
    required: true,
  },
  block: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
</script>

<template>
  <UButton
    :block="block"
    :icon="item.icon"
    :to="item.link"
    :ui="{ rounded: 'rounded-full' }"
    :variant="route.path === item.link ? 'solid' : 'ghost'"
  >
    {{ item.label }}
  </UButton>
</template>
