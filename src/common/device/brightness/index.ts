import * as Brightness from 'expo-brightness'

/**
 * getBrightness — Lee el brillo de pantalla como porcentaje.
 *
 * @example
 * import { getBrightness } from '@device/brightness'
 * await getBrightness()
 */
const getBrightness = async () => {
  const level = await Brightness.getBrightnessAsync()
  return Math.round(level * 100)
}

/**
 * setBrightness — Fija el brillo de pantalla en porcentaje.
 *
 * @example
 * import { setBrightness } from '@device/brightness'
 * await setBrightness()
 */
const setBrightness = async (percent: number) => {
  const value = Math.min(1, Math.max(0, percent / 100))
  await Brightness.setBrightnessAsync(value)
  return Math.round(value * 100)
}

export { getBrightness, setBrightness }
