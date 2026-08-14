import { openCamera } from '../bridge'
import { pickImage } from '../pick'
import { cameraEngine } from '../runtime'

/**
 * useCamera — captura y galería. El motor lo elige APP_ENV.
 *
 * @example
 * import { useCamera } from '@device/camera'
 * const { open, pick, engine } = useCamera()
 */
const useCamera = () => {
  return {
    open: openCamera,
    pick: pickImage,
    engine: cameraEngine,
  }
}

export { useCamera }
