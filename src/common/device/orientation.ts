import * as ScreenOrientation from 'expo-screen-orientation'

const getOrientation = async () => {
  const orientation = await ScreenOrientation.getOrientationAsync()
  return ScreenOrientation.Orientation[orientation] ?? String(orientation)
}

const lockPortrait = async () => {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_UP,
  )
}

const unlockOrientation = async () => {
  await ScreenOrientation.unlockAsync()
}

export { getOrientation, lockPortrait, unlockOrientation }
