import * as Haptics from 'expo-haptics'

/**
 * hapticImpact — Dispara feedback háptico de impacto.
 *
 * @example
 * import { hapticImpact } from '@device/haptics'
 * await hapticImpact()
 */
const hapticImpact = async (
  style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium,
) => {
  await Haptics.impactAsync(style)
}

/**
 * hapticSuccess — Dispara feedback háptico de éxito.
 *
 * @example
 * import { hapticSuccess } from '@device/haptics'
 * await hapticSuccess()
 */
const hapticSuccess = async () => {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
}

/**
 * hapticWarning — Dispara feedback háptico de advertencia.
 *
 * @example
 * import { hapticWarning } from '@device/haptics'
 * await hapticWarning()
 */
const hapticWarning = async () => {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
}

export { hapticImpact, hapticSuccess, hapticWarning }
