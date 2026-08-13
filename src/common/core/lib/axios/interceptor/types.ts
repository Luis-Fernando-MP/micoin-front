import { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

type HttpInterceptors = {
  request?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  response?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
  error?: (error: unknown) => unknown
}

export type { HttpInterceptors }
