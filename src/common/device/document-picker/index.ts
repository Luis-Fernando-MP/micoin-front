import * as DocumentPicker from 'expo-document-picker'

/**
 * pickDocument — Abre el selector de documentos del sistema.
 *
 * @example
 * import { pickDocument } from '@device/document-picker'
 * await pickDocument()
 */
const pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
    multiple: false,
    type: '*/*',
  })

  if (result.canceled) {
    return null
  }

  return result.assets[0] ?? null
}

export { pickDocument }
