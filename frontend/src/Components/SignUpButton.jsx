import { Button } from '@mui/material'
import React from 'react'

const SignUpButton = ({label,sx,type}) => {
  return (
    <div>
      <Button variant='contained' sx={sx} type={type}>{label}</Button>
    </div>
  )
}

export default SignUpButton
