import * as SecureStore from 'expo-secure-store'

import { type BiometricFailure } from './types'

const VAULT_KEY = 'micoin.biometrics.secret'
const VAULT_SERVICE = 'micoin.biometrics'

const createVaultOptions = (
  authenticationPrompt: string,
): SecureStore.SecureStoreOptions => ({
  keychainService: VAULT_SERVICE,
  requireAuthentication: true,
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  authenticationPrompt,
})

const mapVaultError = (error: unknown): BiometricFailure => {
  const raw = error instanceof Error ? error.message : String(error)
  const message = raw.toLowerCase()

  if (message.includes('cancel')) {
    return { ok: false, reason: 'canceled' }
  }

  if (
    message.includes('nsfaceid') ||
    message.includes('not supported') ||
    message.includes('expo go')
  ) {
    return { ok: false, reason: 'unavailable' }
  }

  return { ok: false, reason: 'failed' }
}

export { createVaultOptions, mapVaultError, VAULT_KEY }
