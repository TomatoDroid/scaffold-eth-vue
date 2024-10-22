import type { ChainWithAttributes } from '~/utils/scaffold-eth/networks'

export const DEFAULT_NETWORK_COLOR: [string, string] = ['#666666', '#bbbbbb']

export function getNetworkColor(network: ChainWithAttributes, isDarkMode: boolean) {
  const colorConfig = network.color ?? DEFAULT_NETWORK_COLOR
  return Array.isArray(colorConfig) ? (isDarkMode ? colorConfig[1] : colorConfig[0]) : colorConfig
}

export function useNetworkColor() {
  const theme = useColorMode()
  const { targetNetwork } = useTargetNetwork()

  const isDarkMode = theme.value === 'dark'
  return getNetworkColor(targetNetwork.value, isDarkMode)
}
