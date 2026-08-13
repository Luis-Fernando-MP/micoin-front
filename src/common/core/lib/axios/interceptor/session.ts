import { Platform } from 'react-native'

import { type InternalAxiosRequestConfig } from 'axios'

import { getAuthCookie } from '@/auth/client'

import { type HttpInterceptors } from './types'

type SessionConfig = InternalAxiosRequestConfig & { session?: boolean }

/**
 * createSessionAuth — adjunta la cookie de Better Auth al gateway.
 *
 * Nativo: header `Cookie`. Web: `withCredentials`.
 * `{ session: false }` omite la cookie.
 *
 * @example
 * import { createSessionAuth } from '@core/lib/axios'
 * createSessionAuth()
 */
const createSessionAuth = (): HttpInterceptors => ({
  request: (config) => {
    const authed = config as SessionConfig
    if (authed.session === false) {
      return config
    }

    if (Platform.OS === 'web') {
      config.withCredentials = true
      return config
    }

    const cookie = getAuthCookie()
    if (cookie) {
      config.headers.set('Cookie', cookie)
    }

    return config
  },
})

export { createSessionAuth }
