import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
  Observable,
} from '@apollo/client'
import { cookies } from 'next/headers'
import { createHttpLink } from '@apollo/client/link/http'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: 'include',
})

const channelMiddleware = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    cookies().then((cookieStore) => {
      const channelToken = cookieStore.get('channel_token')
      operation.setContext({
        headers: {
          'x-channel-token': channelToken?.value || '',
        },
      })
      forward(operation).subscribe(observer)
    })
  })
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
