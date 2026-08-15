import { APP_ENV, isDevelopment } from '@env'

/**
 * cameraEngine — motor activo según APP_ENV.
 *
 * development → expo-camera (Expo Go).
 * production → VisionCamera (solo en APK/IPA; no se importa en development).
 *
 * @example
 * import { cameraEngine } from '@device/camera/runtime'
 */
const cameraEngine = isDevelopment ? 'expo' : 'vision'

export { APP_ENV, cameraEngine }
