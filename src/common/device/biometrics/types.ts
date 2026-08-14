type BiometricReason =
  | 'no_hardware'
  | 'not_enrolled'
  | 'unavailable'
  | 'failed'
  | 'canceled'
  | 'invalidated'
  | 'not_enabled'

type BiometricFailure = {
  ok: false
  reason: BiometricReason
}

type EnableSuccess = {
  ok: true
  at: number
}

type UnlockSuccess = {
  ok: true
  at: number
  value: string
}

type BiometricPromptOptions = {
  promptMessage?: string
  cancelLabel?: string
  disableDeviceFallback?: boolean
}

type BiometricsInfo = {
  hasHardware: boolean
  enrolled: boolean
  types: number[]
  canProtect: boolean
}

export type {
  BiometricFailure,
  BiometricPromptOptions,
  BiometricReason,
  BiometricsInfo,
  EnableSuccess,
  UnlockSuccess,
}
