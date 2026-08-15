import * as SecureStore from 'expo-secure-store'

import {
  type BiometricFailure,
  type BiometricPromptOptions,
  type EnableSuccess,
} from '@device/biometrics/types'
import {
  VAULT_KEY,
  createVaultOptions,
  mapVaultError,
} from '@device/biometrics/vault'

import { metadata } from '@/common/metadata'

/**
 * biometrics.protect — Guarda un string opaco atado a la biometría del dispositivo.
 *
 * @param secret - Valor que el producto quiere proteger (token, nonce, …)
 * @param options - Copy del prompt OS. @default metadata.biometricEnablePrompt
 *
 * @example
 * import biometrics from '@device/biometrics'
 * await biometrics.protect(refreshToken)
 */
const protect = async (
  secret: string,
  options?: BiometricPromptOptions,
): Promise<EnableSuccess | BiometricFailure> => {
  if (!secret) {
    return { ok: false, reason: 'failed' }
  }

  const available = await SecureStore.isAvailableAsync()
  if (!available || !SecureStore.canUseBiometricAuthentication()) {
    return { ok: false, reason: 'unavailable' }
  }

  const promptMessage = options?.promptMessage ?? metadata.biometricEnablePrompt

  try {
    await SecureStore.setItemAsync(
      VAULT_KEY,
      secret,
      createVaultOptions(promptMessage),
    )
    return { ok: true, at: Date.now() }
  } catch (error) {
    return mapVaultError(error)
  }
}

export default protect
