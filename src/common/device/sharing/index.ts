import * as Sharing from 'expo-sharing'

/**
 * shareFile — Comparte un archivo local con el sheet nativo.
 *
 * @example
 * import { shareFile } from '@device/sharing'
 * await shareFile()
 */
const shareFile = async (uri: string, dialogTitle = 'Compartir') => {
  const available = await Sharing.isAvailableAsync()
  if (!available) {
    return { ok: false as const, reason: 'unavailable' as const }
  }

  await Sharing.shareAsync(uri, { dialogTitle })
  return { ok: true as const }
}

export { shareFile }
