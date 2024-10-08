import type { PluginOptions } from 'vue-toastification'
import { useToast } from 'vue-toastification'

const toast = useToast()
// TODO update toast
export const notification = {
  success: (content: string, options?: PluginOptions) => {
    return toast.success(content, { ...options })
  },
  info: (content: string, options?: PluginOptions) => {
    return toast.info(content, { ...options })
  },
  warning: (content: string, options?: PluginOptions) => {
    return toast.warning(content, { ...options })
  },
  error: (content: string, options?: PluginOptions) => {
    return toast.error(content, { ...options })
  },
  // loading: (content: string, options?: PluginOptions) => {
  //   return toast.loading(content, { ...options })
  // },
  remove: (toastId: string) => {
    return toast.dismiss(toastId)
  },
}
