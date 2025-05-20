import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 戻り先のパラメータを含めつつログイン用URLに遷移させるメソッドを生成するhook
 */
export const useSignInRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routerPushSignInPage = React.useCallback(() => {
    navigate(
      `/sign-in?return_to=${encodeURIComponent(location.pathname + location.search + location.hash)}`,
      { replace: true }
    );
  }, [navigate, location]);

  return {
    /**
     * 戻り先のパラメータを含めつつログイン用URLに遷移させるメソッド
     */
    routerPushSignInPage,
  };
};
