import ExpoCameraHost from './engines/expo'
import Filters from './extensions/filters'

type CameraHostComponent = typeof ExpoCameraHost & {
  Filters: typeof Filters
}

/**
 * CameraHost — modal de captura. En development usa expo-camera (Expo Go).
 *
 * @example
 * import CameraHost, { openCamera, useCamera } from '@device/camera'
 * <CameraHost />
 * await openCamera({ facing: 'back' })
 */
const CameraHost = ExpoCameraHost as CameraHostComponent
CameraHost.Filters = Filters

export { openCamera } from './bridge'
export { useCamera } from './hooks'
export { pickImage } from './pick'
export { APP_ENV, cameraEngine } from './runtime'
export type {
  CameraAsset,
  CameraFilter,
  CaptureMode,
  Facing,
  OpenCameraOptions,
} from './types'
export default CameraHost
