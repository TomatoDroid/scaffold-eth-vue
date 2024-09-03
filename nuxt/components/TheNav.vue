<script setup lang="ts">
const menu = ref([
  { label: 'Home', link: '/' },
  { label: 'Debug Contract', link: '/debug', icon: 'i-uil-bug' },
])

const isDrawOpen = ref(false)
const drawOpenRef = ref()

onClickOutside(drawOpenRef, () => {
  isDrawOpen.value = false
})
</script>

<template>
  <header class="sticky lg:static top-0 navbar bg-base-100 min-h-10 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
    <div class="navbar-start">
      <div class="dropdown lg:hidden">
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
          <HeaderMenuLinks :menu="menu" />
        </ul>
      </div>
      <NuxtLink to="/" class="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
        <div class="flex relative w-10 h-10">
          <img class="cursor-pointer" src="public/logo.svg" alt="logo">
        </div>
        <div class="flex flex-col">
          <span class="font-bold leading-tight">Saffold-ETH-VUE</span>
          <span class="text-xs">Ethereum dev stack</span>
        </div>
      </NuxtLink>
      <ul class="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
        <HeaderMenuLinks :menu="menu" />
      </ul>
    </div>
    <div class="navbar-end flex-grow mr-4">
      <WalletConnect />
    </div>
  </header>
</template>
