import { gql } from '@apollo/client'

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      slug
      description
      createdAt
      createdBy
      updatedAt
      updatedBy
      facetValues {
        id
        code
        name
      }
    }
  }
`

export const CREATE_FACET = gql`
  mutation CreateFacet($input: CreateFacetInput!) {
    createFacet(input: $input) {
      id
      name
      code
      isPrivate
    }
  }
`

export const UPDATE_FACET = gql`
  mutation UpdateFacet($input: UpdateFacetInput!) {
    updateFacet(input: $input) {
      id
      name
      code
      isPrivate
    }
  }
`

export const DELETE_FACET = gql`
  mutation DeleteFacet($input: DeleteFacetInput!) {
    deleteFacet(input: $input) {
      id
      name
      code
    }
  }
`

export const DELETE_FACET_LIST = gql`
  mutation DeleteFacetList($ids: [ID!]!) {
    deleteFacetList(ids: $ids)
  }
`

export const CREATE_FACET_VALUE = gql`
  mutation CreateFacetValue($input: CreateFacetValueInput!) {
    createFacetValue(input: $input) {
      id
      name
      code
    }
  }
`
export const UPDATE_FACET_VALUE = gql`
  mutation UpdateFacetValue($input: UpdateFacetValueInput!) {
    updateFacetValue(input: $input) {
      id
      name
      code
    }
  }
`

export const DELETE_FACET_VALUE = gql`
  mutation DeleteFacetValue($id: ID!) {
    deleteFacetValue(id: $id) {
      id
      name
      code
    }
  }
`
