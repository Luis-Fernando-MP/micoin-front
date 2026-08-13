import * as Haptics from 'expo-haptics'

const hapticImpact = async (
  style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium,
) => {
  await Haptics.impactAsync(style)
}

const hapticSuccess = async () => {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
}

const hapticWarning = async () => {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
}

export { hapticImpact, hapticSuccess, hapticWarning }
