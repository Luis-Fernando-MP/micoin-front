import biometrics from '@device/biometrics'
import { withTimeout } from '@device/device/with-timeout'

type BiometricsSnapshot = {
  hasHardware: boolean
  enrolled: boolean
} | null

/**
 * device.biometrics — hardware y enrollment (sin pedir auth ni abrir el vault).
 *
 * @example
 * import device from '@device/device'
 * await device.biometrics()
 */
const readBiometrics = async (): Promise<BiometricsSnapshot> => {
  const snapshot = await withTimeout(biometrics.info())

  if (!snapshot) {
    return null
  }

  return {
    hasHardware: snapshot.hasHardware,
    enrolled: snapshot.enrolled,
  }
}

export type { BiometricsSnapshot }
export default readBiometrics
