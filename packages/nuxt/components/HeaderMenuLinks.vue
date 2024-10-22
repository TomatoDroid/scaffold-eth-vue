<script setup lang="ts">
export interface MenuProps {
  label: string
  link: string
  icon?: string

}

defineProps<{
  menu: MenuProps[]
}>()

const route = useRoute()
</script>

<template>
  <li v-for="item in menu" :key="item.link">
    <NuxtLink
      :to="item.link"
      class="hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm gap-2 grid grid-flow-col"
      :class="{ 'bg-secondary shadow-md': route.path === item.link }"
    >
      <Icon v-if="item.icon" :name="item.icon" />
      <span>{{ item.label }}</span>
    </NuxtLink>
  </li>
</template>
