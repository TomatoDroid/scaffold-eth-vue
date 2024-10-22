<script setup lang="tsx">
import { type TransactionBase, type TransactionReceipt, isAddress, isHex } from 'viem'
import Address from '../Address.vue'
import NumberDisplay from './NumberDisplay.vue'
import ArrayDisplay from './ArrayDisplay.vue'
import StructDisplay from './StructDisplay.vue'
import { replacer } from '~/utils/scaffold-eth/common'

export type DisplayContent =
  | string
  | number
  | bigint
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  | Record<string, any>
  | TransactionBase
  | TransactionReceipt
  | undefined
  | unknown

export type ResultFontSize = 'sm' | 'base' | 'xs' | 'lg' | 'xl' | '2xl' | '3xl'

const props = defineProps<{
  displayContent: DisplayContent | DisplayContent[]
  fontSize: ResultFontSize
}>()

function Display() {
  if (props.displayContent == null) {
    return ''
  }
  if (typeof props.displayContent === 'bigint') {
    return <NumberDisplay value={props.displayContent} />
  }
  if (typeof props.displayContent === 'string') {
    if (isAddress(props.displayContent)) {
      return <Address address={props.displayContent} size={props.fontSize} />
    }
    if (isHex(props.displayContent)) {
      return props.displayContent
    }
  }
  if (Array.isArray(props.displayContent)) {
    return <ArrayDisplay values={props.displayContent} size={props.fontSize} />
  }
  if (typeof props.displayContent === 'object') {
    return <StructDisplay struct={props.displayContent} size={props.fontSize} />
  }

  return JSON.stringify(props.displayContent, replacer, 2)
}
</script>

<template>
  <Display />
</template>
