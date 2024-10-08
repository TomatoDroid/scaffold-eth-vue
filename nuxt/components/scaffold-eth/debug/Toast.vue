<!-- <script setup lang="tsx">
import { type POSITION, useToast } from 'vue-toastification'

defineProps<{
  content: string
  status: 'success' | 'info' | 'loading' | 'error' | 'warning'
  duration?: number
  icon?: string
  position?: POSITION
}>()

const toast = useToast()

function CustomToast() {
  return (
    <div class="flex flex-row items-end justify-between bg-red-500">
      custom
    </div>
  )
}

toast(CustomToast, {
  timeout: 100000,
  icon: 'uil-check-circle',
})
</script> -->
