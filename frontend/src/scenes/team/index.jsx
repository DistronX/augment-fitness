import React from 'react'
import Header from '../../components/Header'
import { Box } from '@mui/material'

export default function Team() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEAM" subtitle="Team subtitle" />
      </Box>
    </Box>
  )
}
