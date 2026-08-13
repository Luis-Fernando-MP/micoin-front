import { getAuthCookie } from '@/auth/client'

type ApiVersion = 'v1' | 'v2'

type RequestOptions = {
  use?: ApiVersion
  body?: unknown
  query?: Record<string, string | number | boolean | undefined>
  headers?: HeadersInit
}

const getBaseUrl = () =>
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000'

function getAuthHeaders(): Record<string, string> {
  const cookie = getAuthCookie()
  return cookie ? { cookie } : {}
}

function buildUrl(path: string, options?: RequestOptions) {
  const version = options?.use ?? 'v1'
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = new URL(`${getBaseUrl()}/${version}${normalizedPath}`)

  if (options?.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value))
    })
  }

  return url.toString()
}

async function request<T>(
  method: string,
  path: string,
  options?: RequestOptions,
): Promise<T> {
  const authHeaders = getAuthHeaders()
  const response = await fetch(buildUrl(path, options), {
    method,
    headers: {
      Accept: 'application/json',
      ...(options?.body !== undefined
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...authHeaders,
      ...options?.headers,
    },
    body:
      options?.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  const payload = (await response.json().catch(() => null)) as T | null

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String((payload as { message?: string }).message)
        : `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return payload as T
}

export const restApi = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>('GET', path, options),
  post: <T>(path: string, options?: RequestOptions) =>
    request<T>('POST', path, options),
  put: <T>(path: string, options?: RequestOptions) =>
    request<T>('PUT', path, options),
  patch: <T>(path: string, options?: RequestOptions) =>
    request<T>('PATCH', path, options),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>('DELETE', path, options),
}
