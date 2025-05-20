import { zodResolver } from '@hookform/resolvers/zod';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { ZodSchema } from 'zod';
import { adminApiClient, AdminApiPaths } from '@/external';
import { useClearSwrCacheByPath } from '@/hooks/common/useClearSwrCacheByPath';
import { formErrorMessages } from '@/sakura-like-ui/constants/formErrorMessages';
import { notificationMessages } from '@/sakura-like-ui/constants/notificationMessages';

type FormParams = Required<
  AdminApiPaths['/company']['post']
>['requestBody']['content']['application/json'];

export const useCompanyCreateForm = (option?: {
  /**
   * post成功時に発火する処理（モーダルを閉じるなどで利用）
   */
  submitSuccessCallback?: () => void;
}) => {
  const notifications = useNotifications();
  const navigate = useNavigate();
  const { clearSwrCacheByPath } = useClearSwrCacheByPath();
  const formSchema: ZodSchema<FormParams> = z.object({
    name: z.string().min(1, { message: formErrorMessages.required }),
  });

  const companyCreateForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onBlur',
  });

  const submitForm = companyCreateForm.handleSubmit(async (data) => {
    const { response } = await adminApiClient.POST('/company', {
      body: data,
    });
    if (response.ok) {
      notifications.show(notificationMessages.createSuccess('Company'), {
        severity: 'success',
      });
      companyCreateForm.reset();
      // 忘れずにキャッシュを削除する
      clearSwrCacheByPath('/company');
      navigate('/companys');
      if (option?.submitSuccessCallback) {
        option.submitSuccessCallback();
      }
    } else {
      console.log(response);
      notifications.show(notificationMessages.error, {
        severity: 'error',
      });
    }
  });

  return {
    /**
     * react hook formのform
     */
    companyCreateForm,
    /**
     * Submit処理
     */
    submitForm,
  };
};
