<script setup lang="ts">
import { formatEther } from 'viem'

const props = defineProps<{
  value: bigint | string | number
}>()

const isEther = ref(false)

const asNumber = computed(() => {
  const num = typeof props.value === 'bigint' ? Number(props.value) : Number(String(props.value))
  return Number.isSafeInteger(num) ? String(num) : null
})

const formattedValue = computed(() => {
  const stringValue = typeof props.value === 'bigint' ? props.value.toString() : String(props.value)
  return isEther.value ? `Ξ${formatEther(BigInt(stringValue))}` : stringValue
})
</script>

<template>
  <div v-if="asNumber">
    {{ asNumber }}
  </div>
  <div v-else class="flex items-baseline">
    {{ formattedValue }}
    <span
      class="tooltip tooltip-secondary font-sans ml-2"
      :data-tip="isEther ? 'Multiply by 1e18' : 'Divide by 1e18'"
    >
      <button class="btn btn-ghost btn-circle btn-xs" @click="isEther = !isEther">
        <Icon name="i-uil-exchange" class="h-3 w-3 opacity-65" />
      </button>
    </span>
  </div>
</template>
