import { BatteryState } from 'expo-battery'

import { getBatteryInfo } from '@device/battery'
import { withTimeout } from '@device/device/with-timeout'

type BatterySnapshot = {
  level: number
  charging: boolean
  powerSaver: boolean
} | null

/**
 * device.battery — nivel, carga y modo ahorro.
 *
 * @example
 * import device from '@device/device'
 * await device.battery()
 */
const battery = async (): Promise<BatterySnapshot> => {
  const info = await withTimeout(getBatteryInfo())

  if (!info) {
    return null
  }

  return {
    level: info.level,
    charging: info.state === BatteryState.CHARGING,
    powerSaver: info.lowPower,
  }
}

export type { BatterySnapshot }
export default battery
