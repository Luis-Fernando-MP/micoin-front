import { Alert } from 'react-native'

import { metadata } from '@/common/metadata'

const scheduleLocalAlert = async (
  title = metadata.name,
  body = 'Movimiento detectado en tu cuenta',
  seconds = 3,
) => {
  const delayMs = Math.max(0, seconds) * 1000
  setTimeout(() => {
    Alert.alert(title, body)
  }, delayMs)

  return { ok: true as const, id: 'local-alert', limited: true as const }
}

export { scheduleLocalAlert }
