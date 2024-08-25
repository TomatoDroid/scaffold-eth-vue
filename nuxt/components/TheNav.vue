<script setup lang="ts">
const menu = ref([
  { label: 'Home', link: '/' },
  { label: 'Debug Contract', link: '/debug', icon: 'i-uil-bug' },
])

const dropMenu = computed(() => [menu.value])
</script>

<template>
  <header
    flex="~ justify-between items-center"

    sticky top-0 z-20 h-16 border-b border-gray-200 bg-gray-900:75 px-0 py-2 backdrop-blur lg:static dark:border-gray-800 sm:px-2
  >
    <div flex="~ items-center">
      <NuxtLink href="/" ml-4 mr-6 hidden items-center gap-2 lg:flex>
        <img h-10 w-10 src="public/logo.svg" alt="logo">
        <div flex flex-col>
          <span font-bold>Scaffold-ETH-VUE</span>
          <span text-xs>Ethereum dev stack</span>
        </div>
      </NuxtLink>
      <ul hidden gap-2 lg:flex>
        <li v-for="item in menu" :key="item.link">
          <NavButton :item="item" />
        </li>
      </ul>
      <div ml-4 lg:hidden>
        <UDropdown :items="dropMenu" :popper="{ placement: 'bottom-start' }">
          <UButton trailing-icon="i-uil-align-justify" />
          <template #item="{ item }">
            <NavButton :item="item" block />
          </template>
        </UDropdown>
      </div>
    </div>
    <div flex="~ items-center gap-2" mr-4>
      <WalletConnect />
    </div>
  </header>
</template>
