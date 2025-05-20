import React from 'react';
import useSWR, { mutate } from 'swr';
import { adminApiClient, AdminApiPaths } from '@/external';

const fetchArguments = {
  url: '/me' as const,
};
const swrKey = '/me' as const;
const fetcher = () =>
  adminApiClient.GET(fetchArguments.url, {
    // 自動fetchの無効化
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

const useSessionContextInit = () => {
  const [session, setSession] = React.useState<{
    status: 'unverified' | 'authenticated' | 'unauthenticated' | 'error';
    data?: AdminApiPaths['/me']['get']['responses']['200']['content']['application/json'];
  }>({
    status: 'unverified',
  });

  useSWR(swrKey, fetcher, {
    onSuccess: (d) => {
      if (d.response.ok) {
        setSession({ status: 'authenticated', data: d.data });
      } else if (d.response.status === 401) {
        setSession({ status: 'unauthenticated' });
      } else {
        setSession({ status: 'error' });
      }
    },
    onError: (error) => {
      setSession({ status: 'error' });
      throw new Error(error.message);
    },
  });

  // SWRのキャッシュをすべて削除する処理
  const clearCache = () => mutate(() => true, undefined, { revalidate: false });

  const deleteSession = () => {
    // ログアウト時にはSWRキャッシュをすべて削除
    clearCache();
    setSession({
      status: 'unauthenticated',
    });
  };

  const refetchSession = () => {
    mutate(swrKey);
  };

  return {
    /**
     * セッション情報
     */
    session,
    /**
     * セッション情報更新処理
     */
    refetchSession,
    /**
     * ログアウト時のセッション情報削除処理
     */
    deleteSession,
  };
};

const sessionContext = React.createContext<ReturnType<typeof useSessionContextInit> | null>(null);

export const useSessionContext = () => {
  const context = React.useContext(sessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionContextProvider');
  }
  return context;
};

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const sessionState = useSessionContextInit();
  return <sessionContext.Provider value={sessionState}>{props.children}</sessionContext.Provider>;
};
