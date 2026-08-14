import { useCallback, useEffect, useState } from 'react'

import { metadata } from '@/common/metadata'

import clearVault from '../extensions/clear'
import enableVault from '../extensions/enable'
import readInfo from '../extensions/info'
import unlockVault from '../extensions/unlock'
import {
  type BiometricFailure,
  type BiometricReason,
  type BiometricsInfo,
  type EnableSuccess,
  type UnlockSuccess,
} from '../types'

type UseBiometricsOptions = {
  enabled: boolean
  onEnabledChange: (enabled: boolean) => void | Promise<void>
  promptMessage?: string
  unlockPromptMessage?: string
}

/**
 * useBiometrics — Configurar / desbloquear con vault biométrico.
 *
 * El flag `enabled` vive en el store del producto. Este hook no persiste nada.
 *
 * @param enabled - Preferencia del producto (huella activada)
 * @param onEnabledChange - Callback para guardar el flag donde el producto quiera
 * @param promptMessage - Copy al configurar. @default metadata.biometricEnablePrompt
 * @param unlockPromptMessage - Copy al entrar. @default metadata.biometricPrompt
 *
 * @example
 * import { useBiometrics } from '@device/biometrics'
 * const bio = useBiometrics({ enabled, onEnabledChange: setEnabled })
 * await bio.enable(refreshToken)
 * const unlocked = await bio.unlock()
 */
const useBiometrics = ({
  enabled,
  onEnabledChange,
  promptMessage = metadata.biometricEnablePrompt,
  unlockPromptMessage = metadata.biometricPrompt,
}: UseBiometricsOptions) => {
  const [info, setInfo] = useState<BiometricsInfo | null>(null)
  const [busy, setBusy] = useState(false)
  const [lastError, setLastError] = useState<BiometricReason | null>(null)

  const refreshInfo = useCallback(async () => {
    const next = await readInfo()
    setInfo(next)
    return next
  }, [])

  useEffect(() => {
    void refreshInfo()
  }, [refreshInfo])

  const enable = useCallback(
    async (secret: string): Promise<EnableSuccess | BiometricFailure> => {
      setBusy(true)
      setLastError(null)

      const result = await enableVault(secret, { promptMessage })

      if (result.ok) {
        await onEnabledChange(true)
      }

      if (!result.ok) {
        setLastError(result.reason)
      }

      setBusy(false)
      return result
    },
    [onEnabledChange, promptMessage],
  )

  const unlock = useCallback(async (): Promise<
    UnlockSuccess | BiometricFailure
  > => {
    setBusy(true)
    setLastError(null)

    const result = await unlockVault({
      promptMessage: unlockPromptMessage,
    })

    if (result.ok) {
      setBusy(false)
      return result
    }

    if (enabled && result.reason === 'not_enabled') {
      setLastError('invalidated')
      await onEnabledChange(false)
      setBusy(false)
      return { ok: false, reason: 'invalidated' }
    }

    setLastError(result.reason)
    setBusy(false)
    return result
  }, [enabled, onEnabledChange, unlockPromptMessage])

  const disable = useCallback(async (): Promise<
    EnableSuccess | BiometricFailure
  > => {
    setBusy(true)
    setLastError(null)

    const result = await clearVault({ promptMessage })

    if (result.ok) {
      await onEnabledChange(false)
    }

    if (!result.ok) {
      setLastError(result.reason)
    }

    setBusy(false)
    return result
  }, [onEnabledChange, promptMessage])

  return {
    info,
    enabled,
    busy,
    lastError,
    enable,
    disable,
    unlock,
    refreshInfo,
  }
}

export type { UseBiometricsOptions }
export { useBiometrics }
