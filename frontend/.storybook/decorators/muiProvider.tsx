import React from 'react';
import { ThemeProvider, CssBaseline, Snackbar } from '@mui/material';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { theme } from '../../src/theme/theme';

export const withMuiProvider = (Story: React.FC, context: any) => {
  const isDark = context.parameters.backgrounds.default === 'Dark';

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <ThemeProvider theme={theme} defaultMode="light">
        <CssBaseline />
        <NotificationsProvider
          slotProps={{
            // スナックバーはデフォルトで3秒で消えるように設定
            snackbar: { autoHideDuration: 3000 },
          }}
        >
          <Story />
        </NotificationsProvider>
      </ThemeProvider>
    </div>
  );
};
