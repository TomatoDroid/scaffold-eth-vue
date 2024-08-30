<script setup lang="ts">
defineProps<{
  menu: ({ label: string, link: string, icon?: undefined })[]
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
