import {
  type BiometricFailure,
  type BiometricPromptOptions,
  type UnlockSuccess,
} from '@device/biometrics/types'

import reveal from '../reveal'

/**
 * biometrics.unlock — Abre el vault. El OS pide huella y devuelve el secreto.
 *
 * @param options - Copy del prompt OS. @default metadata.biometricPrompt
 *
 * @example
 * import biometrics from '@device/biometrics'
 * const unlocked = await biometrics.unlock()
 */
const unlock = async (
  options?: BiometricPromptOptions,
): Promise<UnlockSuccess | BiometricFailure> => {
  return reveal(options)
}

export default unlock
