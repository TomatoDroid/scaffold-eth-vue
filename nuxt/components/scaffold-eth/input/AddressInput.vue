<script setup lang="ts">
import { useEnsAddress, useEnsAvatar, useEnsName } from '@wagmi/vue'
import { type Address, isAddress } from 'viem'
import { normalize } from 'viem/ens'
import { blo } from 'blo'
import InputBase from './InputBase.vue'
import { type CommonInputProps, isENS } from './utils'

const props = defineProps<CommonInputProps>()

const model = defineModel<string>()

const _debouncedValue = refDebounced(model, 500)

const isQueryEnabled = computed(() => {
  return !!(_debouncedValue.value && isAddress(_debouncedValue.value) && isENS(_debouncedValue.value))
})

const {
  data: ensAddress,
  isLoading: isEnsAddressLoading,
  isError: isEnsAddressError,
  isSuccess: isEnsAddressSuccess,
} = useEnsAddress({
  name: props.name,
  chainId: 1,
  query: {
    gcTime: 30_000,
    enabled: isQueryEnabled.value,
  },
})

const {
  data: ensName,
  isLoading: isEnsNameLoading,
  isError: isEnsNameError,
  isSuccess: isEnsNameSuccess,
} = useEnsName({
  address: _debouncedValue.value as Address,
  chainId: 1,
  query: {
    enabled: isAddress(_debouncedValue.value as string),
    gcTime: 30_000,
  },
})

const {
  data: ensAvatar,
  isLoading: isEnsAvatarLoading,
} = useEnsAvatar({
  name: ensName.value ? normalize(ensName.value) : undefined,
  chainId: 1,
  query: {
    enabled: !!ensName.value,
    gcTime: 30_000,
  },
})

const reFocus = computed(() => {
  return isEnsAddressError.value
    || isEnsNameError.value
    || isEnsNameSuccess.value
    || isEnsAddressSuccess.value
    || ensName.value === null
    || ensAddress.value === null
})
</script>

<template>
  <InputBase
    v-model="model"
    :name
    :placeholder
    :error="ensAddress === null"
    :disabled="isEnsAddressLoading || isEnsNameLoading || disabled"
    :re-focus
  >
    <template #prefix>
      <div v-if="ensName" class="flex bg-base-300 rounded-l-full items-center">
        <div v-if="isEnsAvatarLoading" class="skeleton bg-base-200 w-[35px] h-[35px] rounded-full shrink-0" />
        <span v-if="ensAvatar" class="w-[35px]">
          <img class="rounded-full w-full" :src="ensAvatar" :alt="`${ensAddress} avatar`">
        </span>
        <span class="text-accent px-2">
          {{ ensName }}
        </span>
      </div>
      <div v-else-if="isEnsNameLoading || isEnsAddressLoading">
        <div class="flex bg-base-300 rounded-l-full items-center gap-2 pr-2">
          <div class="skeleton bg-base-200 w-[35px] h-[35px] rounded-full shrink-0" />
          <div class="skeleton bg-base-200 h-3 w-20" />
        </div>
      </div>
    </template>
    <template v-if="model" #suffix>
      <img
        alt=""
        class="!rounded-full pr-2" width="35" height="35"
        :src="blo(model as `0x${string}`)"
      >
    </template>
  </InputBase>
</template>
