import UpdateFacetForm from '@avc/features/catalog/components/forms/update-facet-form'
import { initializeSDK } from '@avc/lib/sdk'
import React from 'react'

export default async function Page({ params }: { params: { id: string } }) {
  console.log({ id: params.id })
  const sdk = await initializeSDK()
  const facet = await sdk.facets.getFacetById(params?.id)

  console.log({ facet })

  return <UpdateFacetForm initialValues={facet} />
}
