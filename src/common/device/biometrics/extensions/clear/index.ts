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
 * biometrics.clear — Borra el secreto del Keychain/Keystore.
 *
 * En Android el OS puede pedir biometría al borrar.
 *
 * @param options - Copy del prompt OS. @default metadata.biometricPrompt
 *
 * @example
 * import biometrics from '@device/biometrics'
 * await biometrics.clear()
 */
const clear = async (
  options?: BiometricPromptOptions,
): Promise<EnableSuccess | BiometricFailure> => {
  const available = await SecureStore.isAvailableAsync()
  if (!available) {
    return { ok: false, reason: 'unavailable' }
  }

  const promptMessage = options?.promptMessage ?? metadata.biometricPrompt

  try {
    await SecureStore.deleteItemAsync(
      VAULT_KEY,
      createVaultOptions(promptMessage),
    )
    return { ok: true, at: Date.now() }
  } catch (error) {
    return mapVaultError(error)
  }
}

export default clear
