import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LinearContainer } from '@/components/common/LinearContainer';
import { UnauthenticatedLayout } from '@/components/domain/(unauthenticated)/layout/UnauthenticatedLayout';
import { useSessionContext } from '@/contexts/sessionContext';

export const UnauthenticatedRouteLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, refetchSession } = useSessionContext();
  const searchParams = new URLSearchParams(location.search);
  const returnToPath = searchParams.get('return_to');

  React.useEffect(() => {
    if (session.status === 'authenticated') {
      // ログインしていれば戻り先指定があればそのページへ飛び、それがなければ所属organizationのトップに飛ばす
      if (returnToPath) {
        navigate(decodeURI(returnToPath), { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
    if (session.status === 'unverified') {
      // ブラウザバック時など、セッションが未設定になる場合があるので再取得する
      refetchSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status]);

  return (
    <LinearContainer
      isError={session.status === 'error'}
      isLoading={session.status === 'unverified'}
    >
      <UnauthenticatedLayout>
        <Outlet />
      </UnauthenticatedLayout>
    </LinearContainer>
  );
};
