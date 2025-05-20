import { zodResolver } from '@hookform/resolvers/zod';
import { useNotifications } from '@toolpad/core/useNotifications';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { ZodSchema } from 'zod';
import { adminApiClient, AdminApiPaths } from '@/external';
import { useClearSwrCacheByPath } from '@/hooks/common/useClearSwrCacheByPath';
import { useGetCompany } from './useGetCompany';
import { formErrorMessages } from '@/sakura-like-ui/constants/formErrorMessages';
import { notificationMessages } from '@/sakura-like-ui/constants/notificationMessages';

type FormParams = Required<
  AdminApiPaths['/company/{company}']['put']
>['requestBody']['content']['application/json'];

export const useCompanyUpdateForm = (
  companyId: number,
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
  const { company } = useGetCompany({ path: { company: companyId } });
  const formSchema: ZodSchema<FormParams> = z.object({
    name: z.string().min(1, { message: formErrorMessages.required }),
  });

  const companyUpdateForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company?.name || '',
    },
    mode: 'onBlur',
  });

  // デフォルト値の設定処理
  React.useEffect(() => {
    if (company) {
      companyUpdateForm.reset({
        name: company?.name,
      });
      setIsInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  const submitForm = companyUpdateForm.handleSubmit(async (data) => {
    const { response } = await adminApiClient.PUT('/company/{company}', {
      params: {
        path: {
          company: companyId,
        },
      },
      body: data,
    });
    if (response.ok) {
      notifications.show(notificationMessages.updateSuccess('Company'), {
        severity: 'success',
      });
      // リストページのキャッシュを削除
      clearSwrCacheByPath('/company');
      // 詳細ページのキャッシュを削除
      clearSwrCacheByPath('/company/{company}', {
        path: {
          company: company?.id,
        },
      });
      navigate('/companys');
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
    companyUpdateForm,
    /**
     * 編集対象のデータ
     */
    targetCompany: company,
    /**
     * Submit処理
     */
    submitForm,
  };
};
