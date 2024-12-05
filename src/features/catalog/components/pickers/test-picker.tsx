import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material'
import FacetValuePicker from './facet-value-picker'
import { GET_FACETS } from '@avc/graphql/queries'
import { useQuery } from '@avc/lib/hooks/use-query'
import { FindFacetsResponse } from '@avc/generated/graphql'

export const TestPicker = () => {
  const { data } = useQuery<{ facets: FindFacetsResponse }>(GET_FACETS, {
    fetchPolicy: 'cache-and-network',
  })
  const facets = data?.facets?.items || []
  const [selectedFacetValues, setSelectedFacetValues] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  console.log(facets)

  return (
    <div>
      <Button variant="contained" onClick={handleOpenModal}>
        Nitelik Değerlerini Seç
      </Button>

      {/* Display selected facet values */}
      {selectedFacetValues.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <strong>Seçili Nitelik Değerleri:</strong>
          <ul>
            {selectedFacetValues.map((valueId) => {
              const facetValue = facets
                .flatMap((facet) => facet.values)
                .find((val) => val?.id === valueId)
              return facetValue ? (
                <li key={valueId}>{facetValue.name}</li>
              ) : null
            })}
          </ul>
        </div>
      )}

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Nitelik Değerlerini Seç</DialogTitle>
        <DialogContent>
          <FacetValuePicker
            facets={facets || []}
            selectedValues={selectedFacetValues}
            onSelectionChange={setSelectedFacetValues}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TestPicker
