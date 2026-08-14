import * as SecureStore from 'expo-secure-store'

import {
  type BiometricFailure,
  type BiometricPromptOptions,
  type UnlockSuccess,
} from '@device/biometrics/types'
import {
  createVaultOptions,
  mapVaultError,
  VAULT_KEY,
} from '@device/biometrics/vault'

import { metadata } from '@/common/metadata'

/**
 * biometrics.reveal — Lee el secreto; el OS pide huella/Face ID al descifrar.
 *
 * @param options - Copy del prompt OS. @default metadata.biometricPrompt
 *
 * @example
 * import biometrics from '@device/biometrics'
 * await biometrics.reveal()
 */
const reveal = async (
  options?: BiometricPromptOptions,
): Promise<UnlockSuccess | BiometricFailure> => {
  const available = await SecureStore.isAvailableAsync()
  if (!available || !SecureStore.canUseBiometricAuthentication()) {
    return { ok: false, reason: 'unavailable' }
  }

  const promptMessage = options?.promptMessage ?? metadata.biometricPrompt

  try {
    const value = await SecureStore.getItemAsync(
      VAULT_KEY,
      createVaultOptions(promptMessage),
    )

    if (value == null) {
      return { ok: false, reason: 'not_enabled' }
    }

    return { ok: true, at: Date.now(), value }
  } catch (error) {
    return mapVaultError(error)
  }
}

export default reveal
