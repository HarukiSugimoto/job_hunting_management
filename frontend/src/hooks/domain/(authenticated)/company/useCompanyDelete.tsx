import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from 'react-router-dom';
import { adminApiClient } from '@/external';
import { useClearSwrCacheByPath } from '@/hooks/common/useClearSwrCacheByPath';
import { notificationMessages } from '@/sakura-like-ui/constants/notificationMessages';


export const useCompanyDelete = (option?: {
  /**
   * post成功時に発火する処理（モーダルを閉じるなどで利用）
   */
  submitSuccessCallback?: () => void;
}) => {
  const notifications = useNotifications();
  const navigate = useNavigate();
  const { clearSwrCacheByPath } = useClearSwrCacheByPath();

    const deleteCompany = async (companyId: number) => {
    const { response } = await adminApiClient.DELETE('/company/{company}', {
      params: {
        path: {
          company: companyId,
        },
      },
    });

    if (response.ok) {
      notifications.show(notificationMessages.deleteSuccess('Company'), {
        severity: 'success',
      });

      // キャッシュクリア
      clearSwrCacheByPath('/company');

      // 一覧に戻る or 任意処理
      navigate('/companys');
      if (option?.submitSuccessCallback) {
        option.submitSuccessCallback();
      }
    } else {
      console.error(response);
      notifications.show(notificationMessages.error, {
        severity: 'error',
      });
    }
  };

  return {
    /**
     * Submit処理
     */
    deleteCompany,
  };
};
