import scaffoldConfig from '~/scaffold.config'
import type { ChainWithAttributes } from '~/utils/scaffold-eth/networks'

export const useGlobalStore = defineStore('global', () => {
  const nativeCurrency = ref({
    price: 0,
    isFetching: true,
  })

  const targetNetwork = ref<ChainWithAttributes>(
    scaffoldConfig.targetNetworks[0],
  )
  return {
    nativeCurrency,
    targetNetwork,
  }
})
