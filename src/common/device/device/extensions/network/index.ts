import { type NetworkStateType } from 'expo-network'

import { withTimeout } from '@device/device/with-timeout'
import { getNetworkInfo } from '@device/network'

type NetworkSnapshot = {
  online: boolean
  type: NetworkStateType | null
  ip: string | null
} | null

/**
 * device.network — conectividad, tipo e IP.
 *
 * @example
 * import device from '@device/device'
 * await device.network()
 */
const network = async (): Promise<NetworkSnapshot> => {
  const info = await withTimeout(getNetworkInfo())

  if (!info) {
    return null
  }

  return {
    online: info.isConnected,
    type: info.type ?? null,
    ip: info.ip,
  }
}

export type { NetworkSnapshot }
export default network
