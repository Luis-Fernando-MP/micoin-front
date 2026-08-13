import { Platform } from 'react-native'

import * as Application from 'expo-application'

const getAppInfo = async () => {
  const androidId =
    Platform.OS === 'android' ? Application.getAndroidId() : null
  const iosId =
    Platform.OS === 'ios' ? await Application.getIosIdForVendorAsync() : null

  return {
    name: Application.applicationName,
    version: Application.nativeApplicationVersion,
    build: Application.nativeBuildVersion,
    androidId,
    iosId,
  }
}

export { getAppInfo }
