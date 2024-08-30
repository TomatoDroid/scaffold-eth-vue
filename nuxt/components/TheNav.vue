<script setup lang="ts">
const menu = ref([
  { label: 'Home', link: '/' },
  { label: 'Debug Contract', link: '/debug', icon: 'i-uil-bug' },
])

const route = useRoute()

const isDrawOpen = ref(false)
const drawOpenRef = ref()

onClickOutside(drawOpenRef, () => {
  isDrawOpen.value = false
})
</script>

<template>
  <header class="sticky lg:static top-0 navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label
          tabindex="0" class="btn btn-ghost"
          @click="isDrawOpen = true"
        >
          <Icon name="i-uil-bars" />
        </label>
        <ul
          v-if="isDrawOpen"
          ref="drawOpenRef"
          tabindex="0"
          class="menu dropdown-content shadow bg-base-100 rounded-box w-52"
          @click="isDrawOpen = false"
        >
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
        </ul>
      </div>
    </div>
    <NuxtLink to="/" />
    <div class="navbar-end" />
    <!-- <div class="flex items-center">
      <NuxtLink href="/" class="ml-4 mr-6 hidden items-center gap-2 lg:flex">
        <img class="h-10 w-10" src="public/logo.svg" alt="logo">
        <div class="flex flex-col">
          <span class="font-bold">affold-ETH-VUE</span>
          <span class="text-xs">Ethereum dev stack</span>
        </div>
      </NuxtLink>
      <ul class="hidden gap-2 lg:flex">
        <li v-for="item in menu" :key="item.link">
          <NavButton :item="item" />
        </li>
      </ul>
      <div class="ml-4 lg:hidden">
        <UDropdown :items="dropMenu" :popper="{ placement: 'bottom-start' }">
          <UButton trailing-icon="i-uil-align-justify" />
          <template #item="{ item }">
            <NavButton :item="item" block />
          </template>
        </UDropdown>
      </div>
    </div>
    <div class="flex items-center gap-2 mr-4">
      <WalletConnect />
    </div> -->
  </header>
</template>
