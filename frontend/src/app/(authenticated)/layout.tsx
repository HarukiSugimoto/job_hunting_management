import React from 'react';
import { Outlet } from 'react-router-dom';

import { LinearContainer } from '@/components/common/LinearContainer';
import { AuthenticatedLayout } from '@/components/domain/(authenticated)/layout/AuthenticatedLayout';
import { useSessionContext } from '@/contexts/sessionContext';
import { useSignInRedirect } from '@/hooks/domain/(unauthenticated)/useSignInRedirect';
// import { getEnv } from '@/lib/getEnv';

export const AuthenticatedRouteLayout: React.FC = () => {
  const { session, refetchSession } = useSessionContext();
  const { routerPushSignInPage } = useSignInRedirect();
  React.useEffect(() => {
    if (session.status === 'unauthenticated') {
      // ログインしてなければその時のURLを戻り先としてログインページへリダイレクトする
      routerPushSignInPage();
    }
    if (session.status === 'unverified') {
      // ブラウザバック時など、セッションが未設定になる場合があるので再取得する
      refetchSession();
    }
  }, [refetchSession, routerPushSignInPage, session.status]);

  return (
    <LinearContainer
      isError={session.status === 'error'}
      // isLoading={session.status !== 'authenticated' && getEnv('ENVIRONMENT') !== 'development'}
      isLoading={session.status !== 'authenticated'}
    >
      <AuthenticatedLayout>
        <Outlet />
      </AuthenticatedLayout>
    </LinearContainer>
  );
};
