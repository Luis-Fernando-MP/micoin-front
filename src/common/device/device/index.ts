import * as Device from 'expo-device'

/**
 * getDeviceInfo — Devuelve modelo y sistema operativo del dispositivo.
 *
 * @example
 * import { getDeviceInfo } from '@device/device'
 * await getDeviceInfo()
 */
const getDeviceInfo = () => {
  return {
    brand: Device.brand,
    modelName: Device.modelName,
    osName: Device.osName,
    osVersion: Device.osVersion,
    deviceType: Device.deviceType,
    isDevice: Device.isDevice,
  }
}

export { getDeviceInfo }
