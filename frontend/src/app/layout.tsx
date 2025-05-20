import React from 'react';

import { Outlet, ScrollRestoration } from 'react-router-dom';
import { RootLayout } from '@/components/domain/layout/RootLayout';
import { NotFoundProvider } from '@/contexts/notFound';
import { SessionContextProvider } from '@/contexts/sessionContext';
import { MockProvider } from '@/external/mock/mockProvider';
import { getEnv } from '@/lib/getEnv';

/**
 * envのUSE_MSWがtrueの時だけMockProviderを使用する
 */
const ConditionalMockProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  if (getEnv('USE_MSW')) {
    return <MockProvider>{props.children}</MockProvider>;
  }
  return props.children;
};

export const RootRouteLayout: React.FC = () => (
  <ConditionalMockProvider>
    <NotFoundProvider>
      <SessionContextProvider>
        <RootLayout>
          <ScrollRestoration />
          <Outlet />
        </RootLayout>
      </SessionContextProvider>
    </NotFoundProvider>
  </ConditionalMockProvider>
);
