import React from 'react'
import NavBar from './navbar'
import Box from '../ui/box'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box sx={{ height: '100vh', overflow: 'hidden' }}>
      <NavBar />
      {children}
    </Box>
  )
}
