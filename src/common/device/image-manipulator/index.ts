import * as ImageManipulator from 'expo-image-manipulator'

/**
 * resizeImage — Redimensiona una imagen local a ancho máximo.
 *
 * @example
 * import { resizeImage } from '@device/image-manipulator'
 * await resizeImage()
 */
const resizeImage = async (uri: string, width = 800) => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width } }],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
  )
  return result.uri
}

export { resizeImage }
