type Facing = 'front' | 'back'
type Flash = 'off' | 'on' | 'auto'
type CaptureMode = 'picture' | 'video'
type CameraFilter = 'none' | 'mono' | 'vivid' | 'warm' | 'cool'

type CameraAsset = {
  uri: string
  width?: number
  height?: number
  type?: 'photo' | 'video'
}

type OpenCameraOptions = {
  facing?: Facing
  mode?: CaptureMode
}

type CameraControls = {
  open: (options: OpenCameraOptions) => void
}

export type {
  CameraAsset,
  CameraControls,
  CameraFilter,
  CaptureMode,
  Facing,
  Flash,
  OpenCameraOptions,
}
