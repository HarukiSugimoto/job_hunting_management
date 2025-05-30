import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from 'react-router-dom';
import { adminApiClient } from '@/external';
import { useClearSwrCacheByPath } from '@/hooks/common/useClearSwrCacheByPath';
import { notificationMessages } from '@/sakura-like-ui/constants/notificationMessages';


export const useMyPageDelete = (option?: {
  /**
   * post成功時に発火する処理（モーダルを閉じるなどで利用）
   */
  submitSuccessCallback?: () => void;
}) => {
  const notifications = useNotifications();
  const navigate = useNavigate();
  const { clearSwrCacheByPath } = useClearSwrCacheByPath();

    const deleteMyPage = async (myPageId: number) => {
    const { response } = await adminApiClient.DELETE('/mypage/{mypage}', {
      params: {
        path: {
          mypage: myPageId,
        },
      },
    });

    if (response.ok) {
      notifications.show(notificationMessages.deleteSuccess('MyPage'), {
        severity: 'success',
      });

      // キャッシュクリア
      clearSwrCacheByPath('/mypage');

      // 一覧に戻る or 任意処理
      navigate('/mypages');
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
    deleteMyPage,
  };
};
