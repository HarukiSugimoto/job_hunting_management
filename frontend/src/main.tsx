import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@/index.css';
import App from '@/App.tsx';
import { CustomConfirmProvider } from '@/sakura-like-ui/hooks/CustomConfirm/customConfirmContext';
import { theme } from '@/theme/theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyFallbackComponent = (props: { error: any }) => (
  <div role="alert">
    <p>An error occurred: {props.error.message}</p>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={MyFallbackComponent}>
      <ThemeProvider disableTransitionOnChange defaultMode="system" theme={theme}>
        <CssBaseline enableColorScheme />
        <CustomConfirmProvider>
          <NotificationsProvider
            slotProps={{
              // スナックバーはデフォルトで3秒で消えるように設定
              snackbar: { autoHideDuration: 3000 },
            }}
          >
            <App />
          </NotificationsProvider>
        </CustomConfirmProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
