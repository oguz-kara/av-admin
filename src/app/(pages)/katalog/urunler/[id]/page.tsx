import UpdateProductForm from '@avc/features/catalog/components/forms/update-product-form'
import { initializeSDK } from '@avc/lib/sdk'

export default async function Page({ params }: { params: { id: string } }) {
  const sdk = await initializeSDK()
  const product = await sdk.products.getById(params?.id)
  const facets = await sdk.facets.getFacets()

  console.log({ product })

  return <UpdateProductForm product={product} facets={facets.items} />
}
