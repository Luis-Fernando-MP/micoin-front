import { axiosFactory } from './axiosFactory'
import graphql from './extensions/graphql'

/**
 * Axios — factory HTTP multi-baseURL. GraphQL vive en `api.graphql`.
 *
 * @example
 * import Axios, { createSessionAuth } from '@core/lib/axios'
 * const api = Axios({ v1: `${API_URL}/v1` }, { interceptors: [createSessionAuth()] })
 * await api.get('/balance')
 * await api.graphql.request({ query })
 */
const Axios = Object.assign(axiosFactory, { graphql })

export default Axios
export { apiLogger, createSessionAuth } from './interceptor'
