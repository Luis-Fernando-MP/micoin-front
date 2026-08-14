import { Platform } from 'react-native'

import * as LocalAuthentication from 'expo-local-authentication'

import {
  type BiometricFailure,
  type BiometricPromptOptions,
  type EnableSuccess,
} from '@device/biometrics/types'

import { metadata } from '@/common/metadata'

import info from '../info'
import protect from '../protect'

const provePresence = async (
  options?: BiometricPromptOptions,
): Promise<{ ok: true } | BiometricFailure> => {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: options?.promptMessage ?? metadata.biometricEnablePrompt,
    cancelLabel: options?.cancelLabel ?? metadata.biometricCancel,
    disableDeviceFallback: options?.disableDeviceFallback ?? true,
    biometricsSecurityLevel: 'strong',
  })

  if (result.success) {
    return { ok: true }
  }

  if (
    result.error === 'user_cancel' ||
    result.error === 'system_cancel' ||
    result.error === 'app_cancel'
  ) {
    return { ok: false, reason: 'canceled' }
  }

  if (result.error === 'not_enrolled') {
    return { ok: false, reason: 'not_enrolled' }
  }

  if (result.error === 'not_available') {
    return { ok: false, reason: 'no_hardware' }
  }

  return { ok: false, reason: 'failed' }
}

/**
 * biometrics.enable — Configura el vault: presencia (iOS) + secreto atado al chip.
 *
 * No persiste el flag de producto. El consumidor guarda `enabled` donde quiera.
 *
 * @param secret - String opaco del producto (refresh token, nonce, …)
 * @param options - Copy del prompt OS. @default metadata.biometricEnablePrompt
 *
 * @example
 * import biometrics from '@device/biometrics'
 * await biometrics.enable(refreshToken)
 */
const enable = async (
  secret: string,
  options?: BiometricPromptOptions,
): Promise<EnableSuccess | BiometricFailure> => {
  const snapshot = await info()

  if (!snapshot.hasHardware) {
    return { ok: false, reason: 'no_hardware' }
  }

  if (!snapshot.enrolled) {
    return { ok: false, reason: 'not_enrolled' }
  }

  if (!snapshot.canProtect) {
    return { ok: false, reason: 'unavailable' }
  }

  if (Platform.OS === 'ios') {
    const presence = await provePresence(options)
    if (!presence.ok) {
      return presence
    }
  }

  return protect(secret, options)
}

export default enable
