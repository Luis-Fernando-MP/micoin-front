import { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

import { type HttpInterceptors } from './types'

type LoggerOptions = {
  label?: string
}

/**
 * apiLogger — log de requests en desarrollo.
 *
 * @param label - Prefijo del log. @default método + url
 *
 * @example
 * import { apiLogger } from '@core/lib/axios'
 * apiLogger({ label: 'APP' })
 */
const apiLogger = ({ label }: LoggerOptions = {}): HttpInterceptors => {
  if (!__DEV__) {
    return {}
  }

  return {
    request: (config: InternalAxiosRequestConfig) => {
      const tag = label ?? `${config.method?.toUpperCase()} ${config.url}`
      console.warn(
        `[${tag}] ${config.method?.toUpperCase()} ${config.baseURL ?? ''}${config.url}`,
      )
      return config
    },
    error: (error: unknown) => {
      const err = error as AxiosError
      console.warn('[api]', err.response?.status, err.config?.url, err.message)
      return Promise.reject(error)
    },
  }
}

export { apiLogger }
