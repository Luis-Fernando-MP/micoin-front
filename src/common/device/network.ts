import * as Network from 'expo-network'

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
