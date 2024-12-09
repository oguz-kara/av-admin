import { ApolloClient } from '@apollo/client'
import {
  GET_COLLECTION,
  GET_COLLECTIONS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCTS,
} from '../../../graphql/queries'
import { CREATE_PRODUCT } from '../../../graphql/mutations'
import type {
  Collection,
  CreateProductInput,
  FindCollectionsResponse,
  MutationCreateProductArgs,
  Product,
} from '../../../generated/graphql'

export class CollectionSDK {
  private client: ApolloClient<any>

  constructor(client: ApolloClient<any>) {
    this.client = client
  }

  async getCollections() {
    const response = await this.client.query<{
      collections: FindCollectionsResponse
    }>({
      query: GET_COLLECTIONS,
    })
    return response.data.collections
  }

  async getCollectionById(id: string) {
    const response = await this.client.query<{
      collection: Collection
    }>({
      query: GET_COLLECTION,
      variables: { id },
    })
    return response.data.collection
  }
}
