'use client'
import React, { useState } from 'react'
import {
  Card,
  CardActionArea,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AssetModal from './asset-modal'
import Image from 'next/image'

export default function AssetPickerButton() {
  const [selectedAssets, setSelectedAssets] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Card
        sx={{
          height: 200,
          display: 'flex',
          border: '2px dashed #ccc',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
          },
        }}
        onClick={handleOpen}
      >
        <CardActionArea sx={{ width: '100%', height: '100%' }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CloudUploadIcon color="action" sx={{ fontSize: 48 }} />
            <Typography variant="subtitle1" color="textSecondary">
              Bir dosya yüklemek için tıklayın
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
      {selectedAssets.length > 0 ? (
        <Box>
          <ImageList cols={5} rowHeight={164}>
            {selectedAssets.map((asset: any) => (
              <ImageListItem key={asset.id}>
                <Image
                  width={164}
                  height={164}
                  src={asset.preview}
                  alt={asset.originalName}
                  loading="lazy"
                  style={{
                    objectFit: 'contain',
                    width: '164px',
                    height: '164px',
                  }}
                />
                <ImageListItemBar
                  title={asset.originalName}
                  subtitle={asset.size}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ) : null}

      <AssetModal
        open={open}
        onClose={handleClose}
        assets={selectedAssets}
        onChange={setSelectedAssets}
      />
    </>
  )
}
