import UpdateProductForm from '@avc/features/catalog/components/forms/update-product-form'
import { initializeSDK } from '@avc/lib/sdk'

export default async function Page({ params }: { params: { slug: string } }) {
  const sdk = await initializeSDK()
  const assets = await sdk.assets.getAssets()

  console.log({ assets })

  return <UpdateProductForm />
}
