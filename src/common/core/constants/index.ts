/**
 * API_URL — origen del gateway (REST, GraphQL y Better Auth).
 *
 * @example
 * import { API_URL } from '@core/constants'
 * `${API_URL}/v1`
 */
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000'

/**
 * APP_KEY — clave AES para `jose` (sello local). Expo solo inyecta `EXPO_PUBLIC_*`.
 *
 * @example
 * import { APP_KEY } from '@core/constants'
 */
const APP_KEY = process.env.EXPO_PUBLIC_APP_KEY ?? ''

type AppEnv = 'development' | 'production'

/**
 * APP_ENV — entorno de la app (`development` | `production`).
 *
 * En development el lab usa motores compatibles con Expo Go.
 * En production se activan motores nativos (p. ej. VisionCamera).
 *
 * @example
 * import { APP_ENV, isProduction } from '@core/constants'
 */
const APP_ENV: AppEnv =
  process.env.EXPO_PUBLIC_APP_ENV === 'production'
    ? 'production'
    : 'development'

const isProduction = APP_ENV === 'production'
const isDevelopment = APP_ENV === 'development'

export { API_URL, APP_ENV, APP_KEY, isDevelopment, isProduction }
export type { AppEnv }
