'use client'
import Box from '@avc/components/ui/box'
import { DataGrid, GridColDef } from '@avc/components/ui/data-grid'
import { turkishLocaleText } from '../../locale/turkish-locale-text'
import TextField from '@avc/components/ui/text-field'
import Stack from '@avc/components/ui/stack'
import Typography from '@avc/components/ui/typography'
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone'
import Button from '@avc/components/ui/button'
import Link from '@avc/components/ui/link'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import FormLayout from '@avc/components/layout/form-layout'
import { Card, CardActions, CardContent } from '@mui/material'
import { useProductListing } from '../../hooks/use-product-listing'
import { Product } from '@avc/generated/graphql'

const columns: GridColDef[] = [
  { field: 'featuredAssetId', headerName: 'Resim', width: 50 },
  {
    field: 'name',
    headerName: 'Koleksiyon Adı',
    width: 250,
    renderCell: (params) => (
      <Box>
        <Link href={`/katalog/koleksiyonlar/${params.row.id}`}>
          <Typography variant="body1" sx={{ color: 'secondary.main' }}>
            {params.row.name}
          </Typography>
        </Link>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {(params.row.description || 'Açıklama yok').slice(0, 50) +
            ((params.row.description || '').length > 50 ? '...' : '')}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 90,
  },
  {
    field: 'draft',
    headerName: 'Durum',
    sortable: false,
    width: 160,
  },
  {
    field: 'autoGenerated',
    headerName: 'Otomatik Üretildi',
    sortable: false,
    width: 160,
  },
  {
    field: 'facetValues',
    headerName: 'Nitelikler',
    sortable: false,
    width: 160,
  },
]

export default function ProductListing() {
  const {
    products,
    paginationModel,
    setPaginationModel,
    loading,
    totalItems,
    term,
    setTerm,
  } = useProductListing()

  const rows = products.map((product: Product) => ({
    ...product,
    draft: product.draft ? 'Taslak' : 'Yayında',
    autoGenerated: product.autoGenerated ? 'Evet' : 'Hayır',
    facetValues: product.facetValues
      ?.map((facetValue) => facetValue.name)
      .join(', '),
  }))

  const leftSide = (
    <Box sx={{ px: 4, pb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          slotProps={{
            input: {
              startAdornment: <SearchTwoToneIcon sx={{ mr: 1 }} />,
            },
          }}
          placeholder="Ürün adına göre filtrele"
          size="small"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </Box>
      <DataGrid
        localeText={turkishLocaleText}
        columns={columns}
        rows={rows}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[25, 50, 100]}
        paginationMode="server"
        loading={loading}
        rowCount={totalItems}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          borderRadius: 2,
          border: 0,
          '& .MuiDataGrid-columnHeader': { backgroundColor: '#252a2e' },
          '& .MuiDataGrid-filler': { backgroundColor: '#252a2e' },
          '& .MuiDataGrid-row': {
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          },
          '& .MuiDataGrid-main': {
            borderRadius: 2,
            border: '1px solid #212121',
          },
        }}
      />
    </Box>
  )

  const rightSide = (
    <Card sx={{ p: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderColor: 'divider',
            p: 2,
          }}
        >
          <Typography variant="subtitle1">Aksiyonlar</Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          p: 2,
        }}
      >
        <Box>
          <Link href="/katalog/urunler/yeni">
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineTwoToneIcon />}
            >
              Ürün Ekle
            </Button>
          </Link>
        </Box>
      </CardActions>
    </Card>
  )

  const header = (
    <Box sx={{ px: 4 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography variant="h6">Ürünler</Typography>
          <Typography variant="subtitle1" color="textDisabled">
            Mağaza ürünlerinizi listeleyin ve kategorilere ayırın
          </Typography>
        </Box>
      </Stack>
    </Box>
  )

  return (
    <FormLayout
      title={header}
      leftContent={leftSide}
      rightContent={rightSide}
    />
  )
}