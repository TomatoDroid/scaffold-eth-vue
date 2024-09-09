<script setup lang="ts">
import { type Address as AddressType, getAddress, isAddress } from 'viem'
import { useEnsAvatar, useEnsName } from '@wagmi/vue'
import { normalize } from 'viem/ens'
import { hardhat } from 'viem/chains'
import { getBlockExplorerAddressLink } from '~/utils/scaffold-eth/networks'

interface AddressProps {
  address?: AddressType
  disableAddressLink?: boolean
  format?: 'short' | 'long'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
}
const props = withDefaults(defineProps<AddressProps>(), {
  size: 'base',
})

const blockieSizeMap = {
  'xs': 6,
  'sm': 7,
  'base': 8,
  'lg': 9,
  'xl': 10,
  '2xl': 12,
  '3xl': 15,
}

const textSize = computed(() => `text-${props.size}`)

const addressCopied = ref(false)
const checkSumAddress = computed(() => props.address ? getAddress(props.address) : undefined)

const { targetNetwork } = useTargetNetwork()
const { copy } = useClipboard()
const { data: fetchedEns } = useEnsName({
  address: checkSumAddress,
  chainId: 1,
  query: {
    enabled: isAddress(checkSumAddress.value ?? ''),
  },
})

const { data: fetchedEnsAvatar } = useEnsAvatar({
  name: fetchedEns.value ? normalize(fetchedEns.value) : undefined,
  chainId: 1,
  query: {
    enabled: Boolean(fetchedEns.value),
    gcTime: 30_000,
  },
})

const displayAddress = computed(() => {
  if (fetchedEns.value) {
    return fetchedEns.value
  }
  else if (props.format === 'long') {
    return checkSumAddress
  }
  return `${checkSumAddress.value?.slice(0, 6)}...${checkSumAddress.value?.slice(-4)}`
})

function onCopy() {
  copy(checkSumAddress.value as string)
  addressCopied.value = true
  setTimeout(() => {
    addressCopied.value = false
  }, 800)
}

const copyIcon = computed(() => addressCopied.value ? 'i-uil-check-circle' : 'i-uil-copy')

const blockExplorerAddressLink = computed(() => {
  return getBlockExplorerAddressLink(targetNetwork.value, checkSumAddress.value as string)
})

const avatarSize = computed(() => {
  return (blockieSizeMap[props.size] * 24) / blockieSizeMap.base
})
</script>

<template>
  <ClientOnly>
    <template v-if="!checkSumAddress">
      <div class="animate-pulse flex gap-4">
        <div class="rounded-md bg-slate-300 h-6 w-6" />
        <div class="flex items-center">
          <div class="h-2 w-28 bg-slate-300 rounded" />
        </div>
      </div>
    </template>
    <template v-else>
      <span v-if="!isAddress(checkSumAddress as string)" class="text-error">Wrong Address</span>
      <div class="flex items-center flex-shrink-0">
        <div class="flex-shrink-0">
          <BlockieAvatar
            :address="checkSumAddress"
            :ens-image="fetchedEnsAvatar"
            :size="avatarSize"
          />
        </div>
        <template v-if="disableAddressLink">
          <span class="ml-1.5 font-normal" :class="[textSize]"> {{ displayAddress }}</span>
        </template>
        <template v-else-if="targetNetwork.id === hardhat.id">
          <NuxtLink :to="blockExplorerAddressLink" class="ml-1.5 font-normal" :class="[textSize]">
            {{ displayAddress }}
          </NuxtLink>
        </template>
        <template v-else>
          <a
            class="ml-1.5 font-normal" :class="[textSize]"
            target="_blank"
            :href="blockExplorerAddressLink"
            rel="noopener noreferrer"
          >
            {{ displayAddress }}
          </a>
        </template>
        <button @click="onCopy">
          <Icon :name="copyIcon" class="ml-1.5 text-xl font-normal flex-shrink-0 text-sky-600 h-5 w-5" />
        </button>
      </div>
    </template>
  </ClientOnly>
</template>
