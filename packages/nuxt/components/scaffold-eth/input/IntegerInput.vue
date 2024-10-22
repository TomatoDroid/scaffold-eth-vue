<script setup lang="ts">
import InputBase from './InputBase.vue'
import { type CommonInputProps, IntegerVariant, isValidateInterger } from './utils'

type IntegerInputProps = CommonInputProps & {
  variant?: IntegerVariant
  disableMultiplyBy1e18?: boolean
}

const { disabled, variant = IntegerVariant.UINT256, disableMultiplyBy1e18 = false } = defineProps<IntegerInputProps>()

const model = defineModel<bigint | string>()

const inputError = computed(() => {
  return !isValidateInterger(variant, model.value ?? '', false)
})

function multiplyBy1e18() {
  if (!model.value) {
    return
  }
  if (typeof model.value === 'bigint') {
    model.value = model.value * 10n ** 18n
  }
  else {
    model.value = BigInt(Math.round(Number(model.value) * 10 ** 18))
  }
}
</script>

<template>
  <InputBase v-bind="$props" v-model="model" :error="inputError">
    <template v-if="!inputError && !disableMultiplyBy1e18" #suffix>
      <div
        class="space-x-4 flex tooltip tooltip-top tooltip-secondary before:content-[attr(data-tip)] before:right-[-10px] before:left-auto before:transform-none"
        data-tip="Multiply by 1e18 (wei)"
      >
        <button
          class="font-semibold px-4 text-accent"
          :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
          :disabled
          @click="multiplyBy1e18"
        >
          *
        </button>
      </div>
    </template>
  </InputBase>
</template>
