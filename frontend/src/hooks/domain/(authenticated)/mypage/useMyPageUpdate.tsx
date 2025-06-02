import { zodResolver } from '@hookform/resolvers/zod';
import { useNotifications } from '@toolpad/core/useNotifications';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { ZodSchema } from 'zod';
import { adminApiClient, AdminApiPaths } from '@/external';
import { useClearSwrCacheByPath } from '@/hooks/common/useClearSwrCacheByPath';
import { formErrorMessages } from '@/sakura-like-ui/constants/formErrorMessages';
import { notificationMessages } from '@/sakura-like-ui/constants/notificationMessages';
import { useGetMyPage } from './useGetMyPage';

type FormParams = Required<
  AdminApiPaths['/mypage/{mypage}']['put']
>['requestBody']['content']['application/json'];

export const useMyPageUpdateForm = (
  myPageId: number,
  option?: {
    /**
     * put成功時に発火する処理（モーダルを閉じるなどで利用）
     */
    submitSuccessCallback?: () => void;
  }
) => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const notifications = useNotifications();
  const navigate = useNavigate();
  const { clearSwrCacheByPath } = useClearSwrCacheByPath();
  const { mypage } = useGetMyPage({ path: { mypage: myPageId } });
  const formSchema: ZodSchema<FormParams> = z.object({
    link: z.string().min(1, { message: formErrorMessages.required }),
    login_id: z.string().min(1, { message: formErrorMessages.required }),
    type: z.string().min(1, { message: formErrorMessages.required }),
    priority: z.number().min(1, { message: formErrorMessages.required }),
    company_id: z.number().min(1, { message: formErrorMessages.required }),
  });

  const mypageUpdateForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: mypage?.link || '',
      login_id: mypage?.login_id || '',
      type: mypage?.type || '',
      priority: mypage?.priority || -1,
      company_id: mypage?.company?.id || -1,
    },
    mode: 'onBlur',
  });

  // デフォルト値の設定処理
  React.useEffect(() => {
    if (mypage) {
      mypageUpdateForm.reset({
        link: mypage?.link || '',
        login_id: mypage?.login_id || '',
        type: mypage?.type || '',
        priority: mypage?.priority || -1,
        company_id: mypage?.company?.id || -1,
      });
      setIsInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mypage]);

  const submitForm = mypageUpdateForm.handleSubmit(async (data) => {
    const { response } = await adminApiClient.PUT('/mypage/{mypage}', {
      params: {
        path: {
          mypage: myPageId,
        },
      },
      body: data,
    });
    if (response.ok) {
      notifications.show(notificationMessages.updateSuccess('MyPage'), {
        severity: 'success',
      });
      // リストページのキャッシュを削除
      clearSwrCacheByPath('/mypage');
      navigate('/mypages');
      if (option?.submitSuccessCallback) {
        option.submitSuccessCallback();
      }
    } else {
      notifications.show(notificationMessages.error, {
        severity: 'error',
      });
    }
  });

  return {
    /**
     * フェッチ、初期化処理が完了しているか
     */
    isInitialized,
    /**
     * react hook formのform
     */
    mypageUpdateForm,
    /**
     * 編集対象のデータ
     */
    targetMyPage: mypage,
    /**
     * Submit処理
     */
    submitForm,
  };
};
