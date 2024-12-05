import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      items {
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
      pagination {
        skip
        take
      }
    }
  }
`

export const GET_FACETS = gql`
  query GetFacets {
    facets {
      items {
        id
        name
        code
        isPrivate
        values {
          id
          name
          code
        }
      }
      pagination {
        skip
        take
      }
    }
  }
`

export const GET_FACET = gql`
  query GetFacet($input: ID!) {
    facet(id: $input) {
      id
      name
      code
      isPrivate
      values {
        id
        name
        code
      }
    }
  }
`

export const GET_FACET_VALUES = gql`
  query GetFacetValues($input: GetFacetValuesInput!) {
    facetValues(input: $input) {
      items {
        id
        name
        code
      }
      pagination {
        skip
        take
        total
      }
    }
  }
`

export const GET_FACET_VALUE = gql`
  query GetFacetValue($input: GetFacetValueInput!) {
    facetValue(input: $input) {
      id
      name
      code
    }
  }
`
