import * as ScreenCapture from 'expo-screen-capture'

const setScreenProtected = async (enabled: boolean) => {
  if (enabled) {
    await ScreenCapture.preventScreenCaptureAsync('micoin')
    return true
  }
  await ScreenCapture.allowScreenCaptureAsync('micoin')
  return false
}

export { setScreenProtected }
