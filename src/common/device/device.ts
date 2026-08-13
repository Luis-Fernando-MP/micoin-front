import * as Device from 'expo-device'

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
