import {
  APP_ENV,
  APP_KEY,
  GOOGLE_MAPS_API_KEY,
  STRIPE_PUBLISHABLE_KEY,
} from './index'

const isDevelopment = APP_ENV === 'development'
const hasAppKey = Boolean(APP_KEY)
const hasGoogleMapsKey = Boolean(GOOGLE_MAPS_API_KEY)
const hasStripeKey = Boolean(STRIPE_PUBLISHABLE_KEY)

export { hasAppKey, hasGoogleMapsKey, hasStripeKey, isDevelopment }
