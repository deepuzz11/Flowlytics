import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; 

const LoginButton = ({ label, sx, type}) => {
  return (
    <div>
   
        <Button variant="contained" sx={sx} type={type}>
          {label}
        </Button>
 
    </div>
  );
};

export default LoginButton;
