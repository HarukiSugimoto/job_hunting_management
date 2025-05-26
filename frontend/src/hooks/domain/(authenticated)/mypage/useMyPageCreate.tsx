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
  AdminApiPaths['/mypage']['post']
>['requestBody']['content']['application/json'];

export const useMyPageCreateForm = (option?: {
  /**
   * post成功時に発火する処理（モーダルを閉じるなどで利用）
   */
  submitSuccessCallback?: () => void;
}) => {
  const notifications = useNotifications();
  const navigate = useNavigate();
  const { clearSwrCacheByPath } = useClearSwrCacheByPath();
  const formSchema: ZodSchema<FormParams> = z.object({
    company_id: z.number().min(0, { message: formErrorMessages.required }),
    type: z.string().min(1, { message: formErrorMessages.required }),
    priority: z.number().min(0, { message: formErrorMessages.required }),
    login_id: z.string().min(1, { message: formErrorMessages.required }),
    link: z.string().min(1, { message: formErrorMessages.required }),
  });
  const mypageCreateForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_id: -1,
      type: '',
      priority: -1,
      login_id: '',
      link: '',
    },
    mode: 'onBlur',
  });

  const submitForm = mypageCreateForm.handleSubmit(async (data) => {
    const { response } = await adminApiClient.POST('/mypage', {
      body: data,
    });
    if (response.ok) {
      notifications.show(notificationMessages.createSuccess('MyPage'), {
        severity: 'success',
      });
      mypageCreateForm.reset();
      // 忘れずにキャッシュを削除する
      clearSwrCacheByPath('/mypage');
      navigate('/mypages');
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
    mypageCreateForm,
    /**
     * Submit処理
     */
    submitForm,
  };
};
