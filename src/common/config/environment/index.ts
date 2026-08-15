type AppEnv = 'development' | 'production'

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000'
const APP_KEY = process.env.EXPO_PUBLIC_APP_KEY ?? ''
const APP_ENV: AppEnv =
  process.env.EXPO_PUBLIC_APP_ENV === 'production'
    ? 'production'
    : 'development'
const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY ?? ''

export * from './flags'
export {
  API_URL,
  APP_ENV,
  APP_KEY,
  GOOGLE_MAPS_API_KEY,
  STRIPE_PUBLISHABLE_KEY,
}
export type { AppEnv }
