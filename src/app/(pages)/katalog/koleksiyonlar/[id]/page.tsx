import UpdateCollectionForm from '@avc/features/catalog/components/forms/update-collection-form'
import { initializeSDK } from '@avc/lib/sdk'

export default async function UpdateCollectionPage({
  params,
}: {
  params: { id: string }
}) {
  const sdk = await initializeSDK()

  const collection = await sdk.collections.getCollectionById(params.id)

  return <UpdateCollectionForm collection={collection} />
}
