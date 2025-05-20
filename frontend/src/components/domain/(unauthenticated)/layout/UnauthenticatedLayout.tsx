import { Box } from '@mui/material';
import React from 'react';

interface UnauthenticatedLayoutProps {
  children: React.ReactNode;
}

export const UnauthenticatedLayout: React.FC<UnauthenticatedLayoutProps> = (props) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <main>{props.children}</main>
    </Box>
  </Box>
);
