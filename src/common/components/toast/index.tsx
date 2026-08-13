import { Alert, Platform, ToastAndroid } from 'react-native'

import type { BrandStatus } from '@/common/components/shared/brand'

type ToastPayload = {
  title: string
  message?: string
  status?: BrandStatus
}

/**
 * showToast — aviso nativo (Android Toast / iOS Alert).
 *
 * @param title - Título
 * @param title.title
 * @param message - Cuerpo opcional
 * @param status - Variante semántica BRAND
 *
 * @param title.message
 * @example
 * import { showToast } from '@/common/components/toast';
 * showToast({ title: 'Listo', status: 'success' });
 */
const showToast = ({ title, message }: ToastPayload) => {
  const body = message?.trim() ? message : undefined

  if (Platform.OS === 'android') {
    const text = body ? `${title} · ${body}` : title
    ToastAndroid.show(text, ToastAndroid.SHORT)
    return
  }

  Alert.alert(title, body)
}

export { showToast }
