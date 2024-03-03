import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        background: 'secondary.main',
      }}
    >
      <CircularProgress size={80} sx={{ color: 'primary.main' }} />
    </Box>
 );
};

export default LoadingComponent;