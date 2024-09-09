<script setup lang="ts">
import { blo } from 'blo'

interface BlockieAvatarProps {
  address: string
  ensImage: string | undefined | null
  size: number
}

const props = defineProps<BlockieAvatarProps>()

const ensImage = computed(() => {
  return props.ensImage
    ? props.ensImage
    : (props.address
        ? blo(props.address as `0x${string}`)
        : undefined)
})
</script>

<template>
  <ClientOnly>
    <img
      class="rounded-full"
      :src="ensImage"
      :width="size"
      :height="size"
      :alt="`${address} avatar`"
    >
  </ClientOnly>
</template>
