import * as ScreenCapture from 'expo-screen-capture'

/**
 * setScreenProtected — Activa o desactiva protección contra captura de pantalla.
 *
 * @example
 * import { setScreenProtected } from '@device/screen-capture'
 * await setScreenProtected()
 */
const setScreenProtected = async (enabled: boolean) => {
  if (enabled) {
    await ScreenCapture.preventScreenCaptureAsync('micoin')
    return true
  }
  await ScreenCapture.allowScreenCaptureAsync('micoin')
  return false
}

export { setScreenProtected }
