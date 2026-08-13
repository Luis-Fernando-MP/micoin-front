import * as Battery from 'expo-battery'

/**
 * getBatteryInfo — Lee nivel, estado y modo bajo consumo de batería.
 *
 * @example
 * import { getBatteryInfo } from '@device/battery'
 * await getBatteryInfo()
 */
const getBatteryInfo = async () => {
  const [level, state, lowPower] = await Promise.all([
    Battery.getBatteryLevelAsync(),
    Battery.getBatteryStateAsync(),
    Battery.isLowPowerModeEnabledAsync(),
  ])

  return {
    level: Math.round(level * 100),
    state,
    lowPower,
  }
}

export { getBatteryInfo }
