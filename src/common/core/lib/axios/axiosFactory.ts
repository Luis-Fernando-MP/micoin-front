import axios, { type AxiosRequestConfig, type CreateAxiosDefaults } from 'axios'
import { omit } from 'es-toolkit'

import graphql from './extensions/graphql'
import { type HttpInterceptors } from './interceptor'

type RequestConfig<T = string> = AxiosRequestConfig & {
  utils?: HttpInterceptors[]
  use?: T
  session?: boolean
}

type UseKey<T> = keyof T extends string ? keyof T : string

type AxiosFactoryReturn<T> = {
  client: ReturnType<typeof axios.create>
  get: <U>(url: string, config?: RequestConfig<UseKey<T>>) => Promise<U>
  post: <U>(
    url: string,
    data?: unknown,
    config?: RequestConfig<UseKey<T>>,
  ) => Promise<U>
  put: <U>(
    url: string,
    data?: unknown,
    config?: RequestConfig<UseKey<T>>,
  ) => Promise<U>
  patch: <U>(
    url: string,
    data?: unknown,
    config?: RequestConfig<UseKey<T>>,
  ) => Promise<U>
  delete: <U>(url: string, config?: RequestConfig<UseKey<T>>) => Promise<U>
  all: typeof axios.all
  spread: typeof axios.spread
  allSettled: <U>(requests: Promise<U>[]) => Promise<PromiseSettledResult<U>[]>
  abort: () => void
  graphql: ReturnType<typeof graphql>
}

class MissingBaseURLError extends Error {
  constructor(use?: string) {
    super(
      use
        ? `[axiosFactory] No baseURL found for key "${use}".`
        : '[axiosFactory] No baseURL provided.',
    )
    this.name = 'MissingBaseURLError'
  }
}

const applyUtils = (
  client: ReturnType<typeof axios.create>,
  utils: HttpInterceptors[],
) => {
  const ids = utils.map(({ request, response, error }) => ({
    request: request ? client.interceptors.request.use(request) : undefined,
    response:
      response || error
        ? client.interceptors.response.use(response, error)
        : undefined,
  }))

  return () => {
    ids.forEach(({ request, response }) => {
      if (request !== undefined) {
        client.interceptors.request.eject(request)
      }
      if (response !== undefined) {
        client.interceptors.response.eject(response)
      }
    })
  }
}

/**
 * axiosFactory — cliente HTTP multi-baseURl
 *
 * `get`/`post` devuelven el body (`response.data`), no el AxiosResponse.
 *
 * @param baseURL - URL única o mapa (`v1`, `v2`, `graphql`, …)
 * @param options.interceptors - Interceptores de la instancia
 * @param options.config - Defaults de axios
 *
 * @example
 * const api = axiosFactory({ v1: `${API_URL}/v1` })
 * await api.get('/balance', { use: 'v1' })
 */
const axiosFactory = <const T extends Record<string, string>>(
  baseURL: string | T | null | undefined,
  options?: {
    interceptors?: HttpInterceptors[]
    config?: CreateAxiosDefaults
  },
): AxiosFactoryReturn<T> => {
  let controller = new AbortController()

  const reject = () => Promise.reject(new MissingBaseURLError())

  if (!baseURL) {
    return {
      client: axios.create(),
      get: reject,
      post: reject,
      put: reject,
      patch: reject,
      delete: reject,
      all: axios.all,
      spread: axios.spread,
      allSettled: (requests) => Promise.allSettled(requests),
      abort: () => {},
      graphql: graphql({
        post: () => Promise.reject(new MissingBaseURLError()),
      }),
    }
  }

  const firstURL =
    typeof baseURL === 'string'
      ? baseURL || null
      : (Object.values(baseURL).find(Boolean) ?? null)

  const resolveURL = (use?: string): string | null => {
    if (typeof baseURL === 'string') {
      return baseURL || null
    }
    return (use ? (baseURL[use] ?? null) : null) || firstURL
  }

  const applyInterceptors = (target: ReturnType<typeof axios.create>) => {
    options?.interceptors?.forEach(({ request, response, error }) => {
      if (request) {
        target.interceptors.request.use(request)
      }
      if (response || error) {
        target.interceptors.response.use(response, error)
      }
    })
  }

  const baseConfig = (): CreateAxiosDefaults => ({
    ...options?.config,
    signal: controller.signal,
    timeout: 20_000,
  })

  const client = axios.create({
    ...baseConfig(),
    baseURL: firstURL ?? undefined,
  })
  applyInterceptors(client)

  const request = async <U>(incoming: RequestConfig): Promise<U> => {
    const resolvedBase = resolveURL(incoming.use as string | undefined)

    if (!resolvedBase) {
      return Promise.reject(
        new MissingBaseURLError(incoming.use as string | undefined),
      )
    }

    const tempClient = axios.create({ ...baseConfig(), baseURL: resolvedBase })
    applyInterceptors(tempClient)
    const eject = incoming.utils?.length
      ? applyUtils(tempClient, incoming.utils)
      : null
    const axiosConfig = omit(incoming, ['utils', 'use'])

    try {
      const response = await tempClient.request(axiosConfig)
      return response.data as U
    } finally {
      eject?.()
    }
  }

  return {
    client,
    get: <U>(url: string, config?: RequestConfig) =>
      request<U>({ ...config, method: 'GET', url }),
    post: <U>(url: string, data?: unknown, config?: RequestConfig) =>
      request<U>({ ...config, method: 'POST', url, data }),
    put: <U>(url: string, data?: unknown, config?: RequestConfig) =>
      request<U>({ ...config, method: 'PUT', url, data }),
    patch: <U>(url: string, data?: unknown, config?: RequestConfig) =>
      request<U>({ ...config, method: 'PATCH', url, data }),
    delete: <U>(url: string, config?: RequestConfig) =>
      request<U>({ ...config, method: 'DELETE', url }),
    all: axios.all,
    spread: axios.spread,
    allSettled: <U>(requests: Promise<U>[]) => Promise.allSettled(requests),
    abort: () => {
      controller.abort()
      controller = new AbortController()
      client.defaults.signal = controller.signal
    },
    graphql: graphql({
      post: <U>(url: string, data?: unknown, config?: RequestConfig) =>
        request<U>({ ...config, method: 'POST', url, data }),
    }),
  }
}

export { axiosFactory, MissingBaseURLError }
export type { AxiosFactoryReturn, RequestConfig }
