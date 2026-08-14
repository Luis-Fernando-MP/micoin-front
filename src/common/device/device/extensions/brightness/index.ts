import { getBrightness } from '@device/brightness'
import { withTimeout } from '@device/device/with-timeout'

type BrightnessSnapshot = number | null

/**
 * device.brightness — brillo de pantalla en %.
 *
 * @example
 * import device from '@device/device'
 * await device.brightness()
 */
const brightness = (): Promise<BrightnessSnapshot> =>
  withTimeout(getBrightness())

export type { BrightnessSnapshot }
export default brightness
