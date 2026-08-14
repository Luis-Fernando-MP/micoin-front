import * as LocalAuthentication from 'expo-local-authentication'
import * as SecureStore from 'expo-secure-store'

import { type BiometricsInfo } from '@device/biometrics/types'

/**
 * biometrics.info — Hardware, enrollment y si el vault biométrico está disponible.
 *
 * No muestra prompt.
 *
 * @example
 * import biometrics from '@device/biometrics'
 * await biometrics.info()
 */
const info = async (): Promise<BiometricsInfo> => {
  const available = await SecureStore.isAvailableAsync()
  const [hasHardware, enrolled, types] = await Promise.all([
    LocalAuthentication.hasHardwareAsync(),
    LocalAuthentication.isEnrolledAsync(),
    LocalAuthentication.supportedAuthenticationTypesAsync(),
  ])

  const canProtect =
    available &&
    hasHardware &&
    enrolled &&
    SecureStore.canUseBiometricAuthentication()

  return {
    hasHardware,
    enrolled,
    types,
    canProtect,
  }
}

export default info
