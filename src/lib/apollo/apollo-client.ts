import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
  Observable,
} from '@apollo/client'
import { createHttpLink } from '@apollo/client/link/http'
import cookies from 'js-cookie'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: 'include',
})

const channelMiddleware = new ApolloLink((operation, forward) => {
  const channelToken = cookies.get('channel_token')
  operation.setContext({
    headers: {
      'x-channel-token': channelToken || '',
    },
  })
  return forward(operation)
})

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  link: from([channelMiddleware, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})
