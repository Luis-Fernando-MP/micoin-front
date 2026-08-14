import * as ImagePicker from 'expo-image-picker'

import { type CameraAsset } from './types'

/**
 * pickImage — elige una imagen de la galería con permisos incluidos.
 *
 * @example
 * import { pickImage } from '@device/camera'
 * const asset = await pickImage()
 */
const pickImage = async (): Promise<CameraAsset | null> => {
  const current = await ImagePicker.getMediaLibraryPermissionsAsync()
  if (!current.granted) {
    const asked = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!asked.granted) {
      return null
    }
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    quality: 0.9,
    allowsEditing: true,
    mediaTypes: ['images'],
  })

  if (result.canceled) {
    return null
  }

  const asset = result.assets[0]
  if (!asset) {
    return null
  }

  return {
    uri: asset.uri,
    width: asset.width,
    height: asset.height,
    type: 'photo',
  }
}

export { pickImage }
