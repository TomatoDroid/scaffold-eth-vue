<script setup lang="ts">

const menu = ref([
    { label: "Home", link: "/" },
    { label: "Debug Contract", link: "/debug", icon: 'i-uil-bug' },
])

const dropMenu = computed(() => [menu.value])
</script>

<template>
    <header
        flex="~ justify-between items-center"
        py-2 px-0 sm:px-2
        sticky top-0 z-20
        lg:static
        border-b border-gray-200 dark:border-gray-800 
        bg-gray-900:75 backdrop-blur
        h-16
    >
        <div flex="~ items-center">
            <NuxtLink href="/" hidden lg:flex items-center gap-2 ml-4 mr-6>
                <img w-10 h-10 src="public/logo.svg" alt="logo">
                <div flex flex-col>
                    <span font-bold>Scaffold-ETH-VUE</span>
                    <span text-xs>Ethereum dev stack</span>
                </div>
            </NuxtLink>
            <ul hidden lg:flex gap-2>
                <li v-for="item in menu" :key="item.link">
                    <NavButton :item="item" />
                </li>
            </ul>
            <div lg:hidden ml-4>
                <UDropdown :items="dropMenu" :popper="{ placement: 'bottom-start' }">
                    <UButton trailing-icon="i-uil-align-justify" />
                    <template #item="{item}">
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
