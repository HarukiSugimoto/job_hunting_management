/* eslint-disable no-restricted-imports */
import { Article, Settings, Dashboard, Business, Pageview, Check } from '@mui/icons-material';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeaderMenuButton } from './HeaderMenuButton';
import { ColorModeToggle } from '@/components/domain/layout/ColorModeToggle';
import { getEnv } from '@/lib/getEnv';
import { SLHeader } from '@/sakura-like-ui/components/mui/SLHeader';
import { SLSidebar } from '@/sakura-like-ui/components/mui/SLSidebar';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const serviceName = getEnv('SERVICE_NAME');

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = (props) => {
  const theme = useTheme();
  const isTemporaryMode = useMediaQuery(theme.breakpoints.down('md'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isTemporaryMode);

  const handleDrawerToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <CssBaseline />
      <SLHeader
        leftContent={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component={Link} sx={{ ':hover': { opacity: 0.8 } }} to="/">
              <Box
                alt={`${serviceName}のロゴlight`}
                component="img"
                src="/AdminTemplateLogo-light.png"
                sx={{
                  '.light &': {
                    display: 'none',
                  },
                  '.dark &': {
                    display: 'block',
                  },
                  maxHeight: 40,
                }}
              />
              <Box
                alt={`${serviceName}のロゴdark`}
                component="img"
                src="/AdminTemplateLogo-dark.png"
                sx={{
                  '.light &': {
                    display: 'block',
                  },
                  '.dark &': {
                    display: 'none',
                  },
                  maxHeight: 40,
                }}
              />
            </Box>
          </Box>
        }
        rightContent={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ColorModeToggle />
            <HeaderMenuButton />
          </Box>
        }
        onMenuToggle={handleDrawerToggle}
      />

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SLSidebar
          menuItems={[
            { type: 'item', text: 'ダッシュボード', icon: <Dashboard />, href: '/dashboard' },
            { type: 'item', text: '投稿一覧', icon: <Article />, href: '/articles' },
            { type: 'item', text: '設定', icon: <Settings />, href: '/settings' },
            { type: 'item', text: '会社一覧', icon: <Business />, href: '/companys' },
            { type: 'item', text: 'MyPage一覧', icon: <Pageview />, href: '/mypages' },
            { type: 'item', text: '締切一覧', icon: <Check />, href: '/checks' },
          ]}
          open={isSidebarOpen}
          onClose={handleDrawerToggle}
        />
        <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', height: '100%' }}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};
