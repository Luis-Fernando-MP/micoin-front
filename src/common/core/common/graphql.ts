import { getAuthCookie } from '@/auth/client'

type GraphQLError = {
  message: string
}

type GraphQLResponse<T> = {
  data?: T
  errors?: GraphQLError[]
}

type GraphQLRequest<
  TVariables extends Record<string, unknown> | undefined = Record<
    string,
    unknown
  >,
> = {
  query: string
  variables?: TVariables
  operationName?: string
}

const getBaseUrl = () =>
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000'

function getAuthHeaders(): Record<string, string> {
  const cookie = getAuthCookie()
  return cookie ? { cookie } : {}
}

async function request<
  TData,
  TVariables extends Record<string, unknown> | undefined = Record<
    string,
    unknown
  >,
>(input: GraphQLRequest<TVariables>): Promise<TData> {
  const authHeaders = getAuthHeaders()
  const response = await fetch(`${getBaseUrl()}/graphql`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify({
      query: input.query,
      variables: input.variables,
      operationName: input.operationName,
    }),
  })

  const payload = (await response.json()) as GraphQLResponse<TData>

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(', '))
  }

  if (!response.ok || payload.data === undefined) {
    throw new Error(`GraphQL request failed with status ${response.status}`)
  }

  return payload.data
}

export const graphqlClient = {
  request,
}
