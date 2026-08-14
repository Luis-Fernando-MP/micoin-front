import { getCalendars, getLocales } from 'expo-localization'

type LocaleSnapshot = {
  language: string | null
  region: string | null
  currency: string | null
  timezone: string | null
}

/**
 * device.locale — idioma, región, moneda y timezone.
 *
 * @example
 * import device from '@device/device'
 * await device.locale()
 */
const locale = async (): Promise<LocaleSnapshot> => {
  const current = getLocales()[0]
  const calendar = getCalendars()[0]

  return {
    language: current?.languageTag ?? null,
    region: current?.regionCode ?? null,
    currency: current?.currencyCode ?? null,
    timezone: calendar?.timeZone ?? null,
  }
}

export type { LocaleSnapshot }
export default locale
