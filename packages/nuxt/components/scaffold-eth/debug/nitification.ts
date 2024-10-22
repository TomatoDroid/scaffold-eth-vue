import type { PluginOptions } from 'vue-toastification'
import { POSITION, useToast } from 'vue-toastification'
import type { ToastID } from 'vue-toastification/dist/types/types'
import { Icon } from '#components'

const toast = useToast()

const defaultOptions: PluginOptions = {
  position: POSITION.TOP_CENTER,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  rtl: false,
}

const ENUM_STATUSES = {
  success: () => h(Icon, { name: 'i-uil-check-circle', class: 'w-7 text-success' }),
  loading: () => h('span', { class: 'w-6 loading loading-spinner' }),
  error: () => h(Icon, { name: 'i-uil-exclamation-circle', class: 'w-7 text-error' }),
  info: () => h(Icon, { name: 'i-uil-info-circle', class: 'w-7 text-info' }),
  warning: () => h(Icon, { name: 'i-uil-exclamation-triangle', class: 'w-7 text-warning' }),
}

export const notification = {
  success: (content: string, options?: PluginOptions) => {
    return toast.success(content, { ...defaultOptions, icon: ENUM_STATUSES.success(), ...options })
  },
  info: (content: string, options?: PluginOptions) => {
    return toast.info(content, { ...defaultOptions, icon: ENUM_STATUSES.info, ...options })
  },
  warning: (content: string, options?: PluginOptions) => {
    return toast.warning(content, { ...defaultOptions, icon: ENUM_STATUSES.warning, ...options })
  },
  error: (content: string, options?: PluginOptions) => {
    return toast.error(content, { ...defaultOptions, icon: ENUM_STATUSES.error, ...options })
  },
  loading: (content: string, options?: PluginOptions) => {
    return toast(content, { ...defaultOptions, icon: ENUM_STATUSES.loading, ...options })
  },
  remove: (toastId: ToastID) => {
    return toast.dismiss(toastId)
  },
}
