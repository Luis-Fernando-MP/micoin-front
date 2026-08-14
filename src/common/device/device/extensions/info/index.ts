import * as ExpoDevice from 'expo-device'

type InfoSnapshot = {
  model: string | null
  system: string | null
}

/**
 * device.info — modelo y sistema operativo.
 *
 * @example
 * import device from '@device/device'
 * await device.info()
 */
const info = async (): Promise<InfoSnapshot> => ({
  model: ExpoDevice.modelName,
  system: ExpoDevice.osName
    ? `${ExpoDevice.osName} ${ExpoDevice.osVersion ?? ''}`.trim()
    : null,
})

export type { InfoSnapshot }
export default info
