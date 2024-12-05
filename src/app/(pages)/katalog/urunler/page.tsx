'use server'
import Container from '@avc/components/ui/container'
import Typography from '@avc/components/ui/typography'
import ProductListing from '@avc/features/catalog/components/lists/product-listing'
import { initializeSDK } from '@avc/lib/sdk'

export default async function Page() {
  const sdk = await initializeSDK()
  const products = await sdk.products.getProducts()
  const assets = await sdk.assets.getAssets()

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <ProductListing products={products.items} />
    </Container>
  )
}
