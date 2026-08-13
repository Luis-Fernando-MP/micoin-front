import * as Battery from 'expo-battery'

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
