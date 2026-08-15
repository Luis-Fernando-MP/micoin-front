import Axios, { apiLogger, createSessionAuth } from '@core/lib/axios'
import { API_URL } from '@env'

const sessionAuth = createSessionAuth()

const appApi = Axios(
  {
    v1: `${API_URL}/v1`,
    graphql: `${API_URL}/graphql`,
  },
  {
    interceptors: [sessionAuth, apiLogger({ label: 'APP' })],
  },
)

const publicAppApi = Axios(
  {
    v1: `${API_URL}/v1`,
    graphql: `${API_URL}/graphql`,
  },
  {
    interceptors: [apiLogger({ label: 'PUBLIC' })],
  },
)

export { appApi, publicAppApi }
