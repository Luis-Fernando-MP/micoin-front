import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      refetchOnWindowFocus: (query) => query.state.status === 'success',
      refetchOnReconnect: (query) => query.state.status === 'success',
    },
    mutations: {
      retry: false,
    },
  },
});
