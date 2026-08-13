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

export { API_URL, APP_KEY }
