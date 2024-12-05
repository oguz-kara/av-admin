import { ApolloClient } from '@apollo/client'
import { GET_PRODUCTS } from '../../../graphql/queries'
import { CREATE_PRODUCT } from '../../../graphql/mutations'
import type {
  CreateProductInput,
  FindProductsResponse,
  MutationCreateProductArgs,
  Product,
} from '../../../generated/graphql'

export class ProductSDK {
  private client: ApolloClient<any>

  constructor(client: ApolloClient<any>) {
    this.client = client
  }

  async getProducts() {
    const response = await this.client.query<{
      products: FindProductsResponse
    }>({
      query: GET_PRODUCTS,
    })
    return response.data.products
  }

  async createProduct(input: CreateProductInput) {
    const response = await this.client.mutate<
      { createProduct: Product },
      MutationCreateProductArgs
    >({
      mutation: CREATE_PRODUCT,
      variables: { input },
    })
    return response.data?.createProduct
  }
}
