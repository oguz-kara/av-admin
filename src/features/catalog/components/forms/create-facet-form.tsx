'use client'
import { useMutation } from '@avc/lib/hooks/use-mutation'
import { CREATE_FACET } from '@avc/graphql/mutations'
import { Facet, MutationCreateFacetArgs } from '@avc/generated/graphql'
import {
  Button,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Paper from '@avc/components/ui/paper'
import Typography from '@avc/components/ui/typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@avc/components/ui/text-field'
import Card, { CardContent, CardActions } from '@avc/components/ui/card'
import Switch from '@avc/components/ui/switch'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/navigation'

const createFacetSchema = z.object({
  name: z.string().min(1, 'Nitelik adı zorunludur'),
  code: z.string().min(1, 'Kod zorunludur'),
  isPrivate: z.boolean().optional(),
})

type UpdateProductInput = z.infer<typeof createFacetSchema>

export default function CreateFacetForm() {
  const router = useRouter()
  const [showFacetCreatedToast, setShowFacetCreatedToast] =
    useState<boolean>(false)
  const [createFacet, { loading }] = useMutation<
    { createFacet: Facet },
    MutationCreateFacetArgs
  >(CREATE_FACET)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateProductInput>({
    resolver: zodResolver(createFacetSchema),
    defaultValues: {
      name: '',
      code: '',
      isPrivate: false,
    },
  })

  const isPrivate = watch('isPrivate')
  const values = watch()

  const onSubmit = async (data: UpdateProductInput) => {
    try {
      // @ts-ignore
      const result = await createFacet({
        variables: {
          input: {
            name: data.name,
            code: data.code,
            isPrivate: data.isPrivate,
          },
        },
      })

      const createdFacet = result.data?.createFacet
      if (createdFacet) {
        setShowFacetCreatedToast(true)
        router.push(`/katalog/nitelikler/${createdFacet.id}`)
      }
    } catch (error) {
      // Handle error - show error message
      console.error('Error creating facet:', error)
    }
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setShowFacetCreatedToast(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  useEffect(() => {
    console.log({ values })
  }, [values])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row">
        <Paper
          sx={{
            minHeight: '100vh',
            borderRadius: 0,
            flex: 3,
            pb: 4,
            borderRight: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack gap={4} direction="column">
            <Box
              sx={{
                py: 4,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography sx={{ px: 4 }} variant="h5" fontWeight="bold">
                Nitelik Oluştur
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, px: 4 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Nitelik adı buraya..."
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Kod"
                    fullWidth
                    error={!!errors.code}
                    helperText={errors.code?.message}
                  />
                )}
              />
            </Box>
          </Stack>
        </Paper>
        <Box sx={{ flex: 1, p: 2 }}>
          <Stack gap={4} direction="column">
            <Card sx={{ p: 0 }}>
              <React.Fragment>
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
                    <Box>
                      <Typography variant="h6">Yayınla</Typography>
                      <Typography variant="body2">
                        Niteliği şimdi yayınlayın
                      </Typography>
                    </Box>
                    <Box>
                      <Controller
                        name="isPrivate"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <Switch
                            {...field}
                            checked={field.value || false}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        )}
                      />
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={loading}
                  >
                    <Typography
                      variant="button"
                      sx={{ textTransform: 'none' }}
                      fontWeight="bold"
                    >
                      {loading
                        ? 'Creating...'
                        : isPrivate
                        ? 'Şimdi yayınla'
                        : 'Kaydet/Gizle'}
                    </Typography>
                  </Button>
                </CardActions>
              </React.Fragment>
            </Card>
          </Stack>
        </Box>
      </Stack>
      <Snackbar
        open={showFacetCreatedToast}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setShowFacetCreatedToast(false)}
        message="Nitelik oluşturuldu"
        action={action}
      />
    </form>
  )
}
