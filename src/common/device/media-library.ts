import Constants from 'expo-constants'
import * as MediaLibrary from 'expo-media-library'

const isExpoGo = Constants.appOwnership === 'expo'

const saveToGallery = async (uri: string) => {
  if (isExpoGo) {
    return { ok: false as const, reason: 'expo-go' as const }
  }

  const permission = await MediaLibrary.requestPermissionsAsync()
  if (!permission.granted) {
    return { ok: false as const, reason: 'denied' as const }
  }

  const asset = await MediaLibrary.createAssetAsync(uri)
  return { ok: true as const, asset }
}

export { saveToGallery }
