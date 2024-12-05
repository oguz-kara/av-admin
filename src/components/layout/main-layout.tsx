import React from 'react'
import NavBar from './navbar'
import Box from '../ui/box'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar />
      {children}
    </Box>
  )
}

function Gradient() {
  return (
    <Box
      sx={{
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '565px',
        background:
          'linear-gradient(0deg, rgba(198, 199, 201, 0.16) 0%, rgba(67, 71, 75, 0.08) 90%)',
      }}
    ></Box>
  )
}
