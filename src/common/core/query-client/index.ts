import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

const MAX_RETRIES = 3

const statusOf = (error: unknown): number | undefined => {
  if (isAxiosError(error)) {
    return error.response?.status
  }
  return undefined
}

const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (failureCount >= MAX_RETRIES) {
    return false
  }

  const status = statusOf(error)
  if (status === undefined) {
    return true
  }
  if (status === 408 || status === 429) {
    return true
  }
  if (status >= 400 && status < 500) {
    return false
  }
  return true
}

const onQueryError = (error: Error) => {
  if (!__DEV__) {
    return
  }
  const status = statusOf(error)
  console.warn('[query]', status ?? 'network', error.message)
}

/**
 * queryClient — padre de cache y errores de red (máximo 3 reintentos).
 *
 * No reintenta 4xx salvo 408/429. El toast de producto lo pone la screen.
 *
 * @example
 * import { queryClient } from '@core'
 * <QueryClientProvider client={queryClient}>
 */
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => onQueryError(error),
  }),
  mutationCache: new MutationCache({
    onError: (error) => onQueryError(error),
  }),
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      refetchOnWindowFocus: (query) => query.state.status === 'success',
      refetchOnReconnect: (query) => query.state.status === 'success',
    },
    mutations: {
      retry: shouldRetry,
    },
  },
})

export { queryClient }
