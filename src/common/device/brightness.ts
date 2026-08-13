import * as Brightness from 'expo-brightness'

const getBrightness = async () => {
  const level = await Brightness.getBrightnessAsync()
  return Math.round(level * 100)
}

const setBrightness = async (percent: number) => {
  const value = Math.min(1, Math.max(0, percent / 100))
  await Brightness.setBrightnessAsync(value)
  return Math.round(value * 100)
}

export { getBrightness, setBrightness }
