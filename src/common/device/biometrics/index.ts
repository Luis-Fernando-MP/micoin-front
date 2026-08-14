import clear from './extensions/clear'
import enable from './extensions/enable'
import info from './extensions/info'
import protect from './extensions/protect'
import reveal from './extensions/reveal'
import unlock from './extensions/unlock'

/**
 * biometrics — Vault atado a Face ID / huella (Keychain / Keystore).
 *
 * El módulo no guarda el flag de producto ni habla con Better Auth.
 * `enable(secret)` protege un string opaco; `unlock()` lo devuelve si el OS valida.
 *
 * @example
 * import biometrics, { useBiometrics } from '@device/biometrics'
 * await biometrics.enable(refreshToken)
 * const unlocked = await biometrics.unlock()
 * const bio = useBiometrics({ enabled, onEnabledChange: setEnabled })
 */
const biometrics = {
  info,
  enable,
  unlock,
  clear,
  protect,
  reveal,
}

export type { UseBiometricsOptions } from './hooks'
export { useBiometrics } from './hooks'
export type {
  BiometricFailure,
  BiometricPromptOptions,
  BiometricReason,
  BiometricsInfo,
  EnableSuccess,
  UnlockSuccess,
} from './types'
export default biometrics
