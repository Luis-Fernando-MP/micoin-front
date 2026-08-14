import { getBiometricInfo } from '@device/biometrics'
import { withTimeout } from '@device/device/with-timeout'

type BiometricsSnapshot = {
  hasHardware: boolean
  enrolled: boolean
} | null

/**
 * device.biometrics — hardware y enrollment (sin pedir auth).
 *
 * @example
 * import device from '@device/device'
 * await device.biometrics()
 */
const biometrics = async (): Promise<BiometricsSnapshot> => {
  const info = await withTimeout(getBiometricInfo())

  if (!info) {
    return null
  }

  return {
    hasHardware: info.hasHardware,
    enrolled: info.enrolled,
  }
}

export type { BiometricsSnapshot }
export default biometrics
