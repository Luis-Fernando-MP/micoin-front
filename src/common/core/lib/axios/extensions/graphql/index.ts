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
  session?: boolean
}

type GraphqlHost = {
  post: <U>(
    url: string,
    data?: unknown,
    config?: { use?: string; session?: boolean },
  ) => Promise<U>
}

/**
 * graphql — extensión POST GraphQL sobre un cliente axios (`use: 'graphql'`).
 *
 * @param api - Cliente con `post` (appApi, publicApi u otro factory)
 *
 * @example
 * import { appApi } from '@core'
 * await appApi.graphql.request({ query, variables })
 */
const graphql = (api: GraphqlHost) => {
  const request = async <
    TData,
    TVariables extends Record<string, unknown> | undefined = Record<
      string,
      unknown
    >,
  >(
    input: GraphQLRequest<TVariables>,
  ): Promise<TData> => {
    const payload = await api.post<GraphQLResponse<TData>>(
      '/',
      {
        query: input.query,
        variables: input.variables,
        operationName: input.operationName,
      },
      { use: 'graphql', session: input.session },
    )

    if (payload.errors?.length) {
      throw new Error(payload.errors.map((error) => error.message).join(', '))
    }

    if (payload.data === undefined) {
      throw new Error('GraphQL request failed: empty data')
    }

    return payload.data
  }

  return { request }
}

export default graphql
export type { GraphQLRequest }
