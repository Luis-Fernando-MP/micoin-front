import { Linking } from 'react-native'

import * as StoreReview from 'expo-store-review'

/**
 * getReviewInfo — Lee si la tienda permite pedir reseña.
 *
 * @example
 * import { getReviewInfo } from '@device/store-review'
 * await getReviewInfo()
 */
const getReviewInfo = async () => {
  const available = await StoreReview.isAvailableAsync()
  const hasAction = await StoreReview.hasAction()
  const url = StoreReview.storeUrl()
  return { available, hasAction, url }
}

/**
 * requestAppReview — Muestra el diálogo nativo de reseña.
 *
 * @example
 * import { requestAppReview } from '@device/store-review'
 * await requestAppReview()
 */
const requestAppReview = async () => {
  const info = await getReviewInfo()
  if (info.available && info.hasAction) {
    await StoreReview.requestReview()
    return {
      ok: true as const,
      via: 'native' as const,
      url: info.url,
      note: 'El sistema puede omitir el diálogo si ya pediste review hace poco.',
    }
  }

  if (!info.url) {
    return {
      ok: false as const,
      reason: 'unavailable' as const,
      url: null,
      note: 'Expo Go / build sin store URL configurada.',
    }
  }

  await Linking.openURL(info.url)
  return {
    ok: true as const,
    via: 'store' as const,
    url: info.url,
    note: 'Abrimos la ficha de la tienda porque el prompt nativo no está disponible.',
  }
}

export { getReviewInfo, requestAppReview }
