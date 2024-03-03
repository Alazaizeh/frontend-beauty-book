import React, { createContext, useState } from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import InfoIcon from '@mui/icons-material/Info';
import SuccessIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Report';
import { Box, alpha } from '@mui/system';
import MessageIcon from '@mui/icons-material/Markunread';
export const SnackBarContext = createContext();
const SnackBarProvider = ({ children }) => {

  const showSnackbar = (message,variant) => {
    enqueueSnackbar(message, { variant: variant || "default"});
  };

  const snackbarIcons = {
    info: <InfoIcon sx={{color:"#fff"}} />,
    success: <SuccessIcon sx={{color:"#fff"}}/>,
    warning: <WarningIcon sx={{color:"#fff"}} />,
    error: <ErrorIcon sx={{color:"#fff"}} />,
    default: <MessageIcon sx={{color:"#fff"}} />
  };

  const HeroSection = React.memo(({ type }) => (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'info.main',
        bgcolor: (theme) => alpha("#fff", 0.16)
      }}
    >
      {snackbarIcons[type]}
    </Box>
  ));

  return (
    <SnackBarContext.Provider value={{ showSnackbar }}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        variant="info" // Set default variant
        autoHideDuration={2000}
        style={{   borderRadius: '4px' }}
        iconVariant={{
          info: <HeroSection type="info" />,
          success: <HeroSection type="success" />,
          warning: <HeroSection type="warning" />,
          error: <HeroSection type="error" />,
          default: <HeroSection type="default" />
        }}
      >
        {children}
      </SnackbarProvider>
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
