import { ApolloClient } from '@apollo/client'
import { ProductSDK } from './catalog/products'
import { AssetSDK } from './assets/assets'
import { FacetSDK } from './catalog/facets'

export class AVSDK {
  private graphQLClient: ApolloClient<any>
  private restClient: any
  public products: ProductSDK
  public assets: AssetSDK
  public facets: FacetSDK
  constructor(graphQLClient: ApolloClient<any>, restClient: any) {
    this.graphQLClient = graphQLClient
    this.restClient = restClient
    this.products = new ProductSDK(graphQLClient)
    this.assets = new AssetSDK(restClient)
    this.facets = new FacetSDK(graphQLClient)
  }
}

export * from './catalog/products'
export * from './assets/assets'
