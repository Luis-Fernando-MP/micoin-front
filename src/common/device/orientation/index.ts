import * as ScreenOrientation from 'expo-screen-orientation'

/**
 * getOrientation — Lee la orientación actual de pantalla.
 *
 * @example
 * import { getOrientation } from '@device/orientation'
 * await getOrientation()
 */
const getOrientation = async () => {
  const orientation = await ScreenOrientation.getOrientationAsync()
  return ScreenOrientation.Orientation[orientation] ?? String(orientation)
}

/**
 * lockPortrait — Bloquea la orientación en portrait.
 *
 * @example
 * import { lockPortrait } from '@device/orientation'
 * await lockPortrait()
 */
const lockPortrait = async () => {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_UP,
  )
}

/**
 * unlockOrientation — Restaura orientaciones libres.
 *
 * @example
 * import { unlockOrientation } from '@device/orientation'
 * await unlockOrientation()
 */
const unlockOrientation = async () => {
  await ScreenOrientation.unlockAsync()
}

export { getOrientation, lockPortrait, unlockOrientation }
