import type { ConfigContext, ExpoConfig } from 'expo/config'

import appJson from './app.json'

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY ?? ''

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
          apiKey: GOOGLE_MAPS_API_KEY,
        },
      },
    },
    ios: {
      ...base.ios,
      ...config.ios,
      config: {
        ...base.ios?.config,
        ...config.ios?.config,
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
      },
    },
    extra: {
      ...base.extra,
      ...config.extra,
      hasGoogleMapsKey: Boolean(GOOGLE_MAPS_API_KEY),
    },
  }
}
