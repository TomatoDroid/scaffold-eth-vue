<script lang="ts" setup>
import { hardhat } from 'viem/chains'

const { nativeCurrency } = storeToRefs(useGlobalStore())
const { targetNetwork } = useTargetNetwork()
const isLocalNetwork = computed(() => {
  return targetNetwork.value.id === hardhat.id
})
</script>

<template>
  <div class="min-h-0 py-5 px-1 mb-11 lg:mb-0">
    <div class="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
      <div class="flex flex-col md:flex-row gap-2 pointer-events-auto">
        <div>
          <div v-if="nativeCurrency.price > 0" class="btn btn-primary btn-sm font-normal gap-1 cursor-auto">
            <Icon name="i-uil-dollar-alt" class="h-4 w-4" />
            <span>{{ nativeCurrency.price.toFixed(2) }}</span>
          </div>
        </div>
        <div v-if="isLocalNetwork">
          <NuxtLink to="/blockexplorer" class="btn btn-primary btn-sm font-normal gap-1">
            <Icon name="i-uil-search" class="w-4 h-4" />
            <span>Block Explorer</span>
          </NuxtLink>
        </div>
      </div>
      <SwitchTheme />
    </div>
    <div class="w-full">
      <ul class="menu menu-horizontal w-full">
        <div class="flex justify-center items-center gap-2 text-sm text-center w-full">
          <NuxtLink
            to="https://github.com/TomatoDroid/scaffold-eth-vue"
            target="_blank"
            class="link"
          >
            Fork me
          </NuxtLink>
          <span>·</span>
          <div class="flex justify-center items-center gap-2">
            <p>
              Built with
              <Icon name="i-uil-heart" class="inline-block w-4 h-4" />
              at
            </p>
            <NuxtLink
              to="https://buidlguidl.com/"
              target="_blank"
            >
              <Icon name="my-icon:buildl-guidl-logo" class="inline-block w-3 h-5 pb-1 mr-1" />
              <span class="link">BuidlGuidl</span>
            </NuxtLink>
          </div>
          <span>·</span>
          <div className="text-center">
            <a href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA" target="_blank" rel="noreferrer" className="link">
              Support
            </a>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
