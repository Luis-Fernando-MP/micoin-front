import * as Network from 'expo-network'

/**
 * getNetworkInfo — Lee conectividad, tipo de red e IP.
 *
 * @example
 * import { getNetworkInfo } from '@device/network'
 * await getNetworkInfo()
 */
const getNetworkInfo = async () => {
  const [state, ip] = await Promise.all([
    Network.getNetworkStateAsync(),
    Network.getIpAddressAsync().catch(() => null),
  ])

  return {
    isConnected: Boolean(state.isConnected),
    isInternetReachable: state.isInternetReachable,
    type: state.type,
    ip,
  }
}

export { getNetworkInfo }
