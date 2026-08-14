import {
  type CameraAsset,
  type CameraControls,
  type OpenCameraOptions,
} from './types'

let controls: CameraControls | null = null
let pending: ((asset: CameraAsset | null) => void) | null = null

const bindCamera = (next: CameraControls | null) => {
  controls = next
}

const resolveCamera = (asset: CameraAsset | null) => {
  pending?.(asset)
  pending = null
}

/**
 * openCamera — abre el modal de captura y resuelve con el asset o null.
 *
 * @param options - Cámara frontal/trasera y modo foto o video
 *
 * @example
 * import { openCamera } from '@device/camera'
 * const photo = await openCamera({ mode: 'picture' })
 */
const openCamera = (options: OpenCameraOptions = {}) => {
  return new Promise<CameraAsset | null>((resolve) => {
    pending = resolve
    if (!controls) {
      resolve(null)
      return
    }
    controls.open(options)
  })
}

export { bindCamera, openCamera, resolveCamera }
