import Constants, { ExecutionEnvironment } from 'expo-constants'

import { hasGoogleMapsKey as hasMapsApiKey } from '@env'

const extra = Constants.expoConfig?.extra as
  { hasGoogleMapsKey?: boolean } | undefined

/**
 * hasGoogleMapsKey — true en Expo Go o si el APK se compiló con GOOGLE_MAPS_API_KEY.
 *
 * @example
 * import { hasGoogleMapsKey } from '@components/maps/runtime'
 */
const hasGoogleMapsKey =
  hasMapsApiKey ||
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient ||
  Boolean(extra?.hasGoogleMapsKey)

export { hasGoogleMapsKey }
