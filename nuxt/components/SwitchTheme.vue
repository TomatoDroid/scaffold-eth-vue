<script setup lang="ts">
const colorMode = useColorMode()

const isChecked = ref(colorMode.value === 'light')

const swapActive = computed(() => colorMode.preference === 'light')

function handleToggle() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="flex justify-center items-center gap-1 text-sm pointer-events-auto">
    <input
      id="theme-toggle"
      v-model="isChecked"
      type="checkbox"
      class="toggle toggle-primary bg-primary border-primary hover:bg-primary"
      @change="handleToggle"
    >
    <label for="theme-toggle" class="swap swap-rotate" :class="{ 'swap-active': swapActive }">
      <Icon key="1" name="i-uil-sun" class="swap-on h-5 w-5" />
      <Icon key="2" name="i-uil-moon" class="swap-off h-5 w-5" />
    </label>
  </div>
</template>
