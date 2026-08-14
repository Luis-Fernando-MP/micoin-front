import { APP_ENV, isProduction } from '@core/constants'

/**
 * cameraEngine — motor activo según APP_ENV.
 *
 * development → expo-camera (Expo Go).
 * production → VisionCamera (solo en APK/IPA; no se importa en development).
 *
 * @example
 * import { cameraEngine } from '@device/camera/runtime'
 */
const cameraEngine = isProduction ? 'vision' : 'expo'

export { APP_ENV, cameraEngine, isProduction }
