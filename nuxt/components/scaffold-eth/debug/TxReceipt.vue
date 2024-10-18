<script setup lang="ts">
import type { TransactionReceipt } from 'viem'
import ObjectFieldDisplay from './ObjectFieldDisplay.vue'
import { replacer } from '~/utils/scaffold-eth/common'

const { txResult } = defineProps<{
  txResult: TransactionReceipt
}>()
const txResultCopied = ref(false)

const { copy } = useClipboard()

function handleClick() {
  txResultCopied.value = true
  const text = JSON.stringify(txResult, replacer, 2)
  copy(text)
  setTimeout(() => {
    txResultCopied.value = false
  }, 800)
}
</script>

<template>
  <div class="flex text-sm rounded-3xl peer-checked:rounded-b-none min-h-0 bg-secondary py-0">
    <div class="mt-1 pl-2">
      <button @click="handleClick">
        <Icon
          v-if="txResultCopied"
          name="i-uil-check-circle"
          class="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
          aria-hidden="true"
        />
        <Icon
          v-else
          name="i-uil-copy"
          class="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
          aria-hidden="true"
        />
      </button>
    </div>
    <div class="flex-wrap collapse collapse-arrow">
      <input type="checkbox" class="min-h-0 peer">
      <div class="collapse-title text-sm min-h-0 py-1.5 pl-1">
        <strong>Transaction Receipt</strong>
      </div>
      <div class="collapse-content overflow-auto bg-secondary rounded-t-none rounded-3xl !pl-0">
        <pre class="text-xs">
          <ObjectFieldDisplay
            v-for="[k, v] in Object.entries(txResult)"
            :key="k"
            :name="k"
            :value="v"
            size="xs"
            :left-pad="false"
          />
        </pre>
      </div>
    </div>
  </div>
</template>
