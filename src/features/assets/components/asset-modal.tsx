import React, { useState, useRef, useEffect } from 'react'
import {
  Modal,
  Box,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  AppBar,
  Toolbar,
  CircularProgress,
  Button,
  CardContent,
  TextField,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import UploadIcon from '@mui/icons-material/Upload'
import Grid from '@mui/material/Grid2'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import { useQuery } from '@avc/hooks/use-query'
import CheckCircleTwoToneIcon from '@avc/components/icons/check-circle-two-tone'
import { useMutation } from '@avc/hooks/use-mutation'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import { supportedTypes } from '../config/supported-types'
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone'

const StyledModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  outline: 'none',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
}))

function AssetModal({
  open,
  onClose,
  assets,
  onChange,
}: {
  open: boolean
  onClose: () => void
  assets?: any[]
  onChange?: (assets: any[]) => void
}) {
  const [selectedAssets, setSelectedAssets] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    data: assetsStore,
    isPending: isAssetStorePending,
    refetch,
  } = useQuery<any>(['/assets/multiple'])
  const { mutateAsync: mutateAssets, isPending: isMutatingAssets } =
    useMutation<any>()

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const formData = new FormData()
      Array.from(files).forEach((file) => {
        formData.append('files', file)
      })

      const resData = await mutateAssets({
        path: '/assets/upload/multiple',
        options: {
          parseBody: false,
        },
        body: formData,
      })

      setSelectedAssets((prevAssets) => [...resData, ...prevAssets])
      refetch()
    }
  }

  const isAssetSelected = (assetId: number) => {
    return selectedAssets.some((asset) => asset.id === assetId)
  }

  const handleAssetSelect = (asset: any) => {
    if (isAssetSelected(asset.id)) {
      setSelectedAssets((prevAssets) =>
        prevAssets.filter((a) => a.id !== asset.id)
      )
    } else {
      setSelectedAssets((prevAssets) => [asset, ...prevAssets])
    }
  }

  const handleDeleteSelected = async () => {
    const res = await mutateAssets({
      method: 'DELETE',
      path: '/assets/multiple',
      body: { ids: selectedAssets.map((a) => a.id) },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (Array.isArray(res)) setSelectedAssets([])

    refetch()
  }

  useEffect(() => {
    onChange && onChange(selectedAssets)
  }, [selectedAssets])

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalBox>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar sx={{ gap: 4 }}>
            <Typography variant="h6">Bir Dosya Seçin</Typography>
            <TextField
              sx={{ flexGrow: 1 }}
              slotProps={{
                input: {
                  startAdornment: <SearchTwoToneIcon sx={{ mr: 1 }} />,
                },
              }}
              placeholder="Dosya adına göre filtrele"
              size="small"
            />
            {selectedAssets.length > 0 && (
              <Button
                startIcon={<DeleteIcon />}
                color="error"
                onClick={handleDeleteSelected}
              >
                Seçilenleri Sil ({selectedAssets.length})
              </Button>
            )}
            <input
              type="file"
              multiple
              accept={Object.values(supportedTypes).flat().join(',')}
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button
              startIcon={<UploadIcon />}
              color="primary"
              onClick={handleUploadClick}
            >
              Yükle
            </Button>
            <IconButton edge="end" onClick={onClose} sx={{ ml: 2 }}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2, overflowY: 'auto', flexGrow: 1 }}>
          {isAssetStorePending || isMutatingAssets ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {assetsStore?.items?.map((asset: any) => (
                <Grid
                  key={asset.id}
                  size={2}
                  sx={{
                    gridAutoRows: '1fr',
                  }}
                >
                  <Card>
                    <CardActionArea onClick={() => handleAssetSelect(asset)}>
                      {asset.type !== 'IMAGE' ? (
                        <ArticleTwoToneIcon sx={{ fontSize: 160 }} />
                      ) : (
                        <CardMedia
                          component="img"
                          height="140"
                          image={asset.preview}
                          alt={`Asset ${asset.id}`}
                        />
                      )}
                      {isAssetSelected(asset.id) && (
                        <CheckCircleTwoToneIcon
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'primary.main',
                          }}
                        />
                      )}
                    </CardActionArea>
                    <CardContent>
                      <Typography variant="caption" color="text.secondary">
                        {asset.originalName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </StyledModalBox>
    </Modal>
  )
}

export default AssetModal
