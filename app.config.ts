import type { ConfigContext, ExpoConfig } from 'expo/config'

import appJson from './app.json'

const mapsKey = process.env.GOOGLE_MAPS_API_KEY?.trim() ?? ''

export default ({ config }: ConfigContext): ExpoConfig => {
  const base = appJson.expo as ExpoConfig

  return {
    ...base,
    ...config,
    android: {
      ...base.android,
      ...config.android,
      config: {
        ...base.android?.config,
        ...config.android?.config,
        googleMaps: {
          apiKey: mapsKey,
        },
      },
    },
    ios: {
      ...base.ios,
      ...config.ios,
      config: {
        ...base.ios?.config,
        ...config.ios?.config,
        googleMapsApiKey: mapsKey,
      },
    },
    extra: {
      ...base.extra,
      ...config.extra,
      hasGoogleMapsKey: Boolean(mapsKey),
    },
  }
}
