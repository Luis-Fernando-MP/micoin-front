import * as Clipboard from 'expo-clipboard'

/**
 * copyText — Copia un string al portapapeles del sistema.
 *
 * @example
 * import { copyText } from '@device/clipboard'
 * await copyText()
 */
const copyText = async (value: string) => {
  await Clipboard.setStringAsync(value)
  return true
}

/**
 * readText — Lee el texto actual del portapapeles.
 *
 * @example
 * import { readText } from '@device/clipboard'
 * await readText()
 */
const readText = async () => {
  return Clipboard.getStringAsync()
}

export { copyText, readText }
