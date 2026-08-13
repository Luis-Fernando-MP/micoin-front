import * as WebBrowser from 'expo-web-browser'

/**
 * openSecureBrowser — Abre una URL en navegador in-app seguro.
 *
 * @example
 * import { openSecureBrowser } from '@device/web-browser'
 * await openSecureBrowser()
 */
const openSecureBrowser = async (url: string, controlsColor?: string) => {
  const result = await WebBrowser.openBrowserAsync(url, {
    presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
    ...(controlsColor ? { controlsColor } : {}),
  })
  return { ok: true as const, type: result.type }
}

export { openSecureBrowser }
