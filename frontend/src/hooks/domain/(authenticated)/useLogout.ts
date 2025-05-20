import { useNotifications } from '@toolpad/core/useNotifications';
import React from 'react';
import { useSessionContext } from '@/contexts/sessionContext';
import { adminApiClient } from '@/external';

export const useLogout = () => {
  const notifications = useNotifications();
  const { deleteSession } = useSessionContext();
  const sessionLogout = React.useCallback(async () => {
    const { response } = await adminApiClient.GET('/auth/logout', {
      parseAs: 'text',
    });
    if (response.ok) {
      deleteSession();
      notifications.show('ログアウトしました', {
        severity: 'success',
        autoHideDuration: 3000,
      });
    } else {
      notifications.show('エラーが発生しました', {
        severity: 'error',
        autoHideDuration: 3000,
      });
    }
  }, [deleteSession, notifications]);

  return {
    /**
     * ログアウト処理
     */
    sessionLogout,
  };
};
