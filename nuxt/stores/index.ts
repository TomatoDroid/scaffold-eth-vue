import scaffoldConfig from '~/scaffold.config'
import { fetchPriceFromUniswap } from '~/utils/scaffold-eth/fetchPriceFromUniswap'
import type { ChainWithAttributes } from '~/utils/scaffold-eth/networks'

export const useGlobalStore = defineStore('global', () => {
  const nativeCurrency = ref({
    price: 0,
    isFetching: true,
  })

  const targetNetwork = ref<ChainWithAttributes>(
    scaffoldConfig.targetNetworks[0],
  )

  watch(targetNetwork, async () => {
    const price = await fetchPriceFromUniswap(targetNetwork.value)
    nativeCurrency.value.price = price
  })

  return {
    nativeCurrency,
    targetNetwork,
  }
})
