import React from 'react';
import { Button } from '@mui/material';

const SignUpButton = ({ label, sx, type }) => {
  return (
    <div>
      <Button type={type} sx={sx}>
        {label}
      </Button>
    </div>
  );
};

export default SignUpButton;
