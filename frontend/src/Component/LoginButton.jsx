import React from 'react'
import { Button } from '@mui/material'
const LoginButton = ({label,type,sx}) => {
  return (
    <div>
      <Button type={type} sx={sx}> 
        {label}
      </Button>
    </div>
  )
}

export default LoginButton
