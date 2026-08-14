import { type CameraFilter } from '@device/camera/types'

const FILTERS: CameraFilter[] = ['none', 'mono', 'vivid', 'warm', 'cool']

const FILTER_OVERLAY: Record<CameraFilter, string | null> = {
  none: null,
  mono: 'rgba(128,128,128,0.38)',
  vivid: 'rgba(255,80,0,0.18)',
  warm: 'rgba(255,160,60,0.22)',
  cool: 'rgba(40,120,255,0.2)',
}

/**
 * Camera.Filters — presets de color sobre el preview (no AR / no caritas).
 *
 * @example
 * import camera from '@device/camera'
 * camera.Filters.list
 */
const Filters = {
  list: FILTERS,
  overlay: FILTER_OVERLAY,
}

export { FILTER_OVERLAY, FILTERS }
export default Filters
