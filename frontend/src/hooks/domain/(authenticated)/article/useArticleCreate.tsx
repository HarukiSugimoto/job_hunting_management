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
  AdminApiPaths['/articles']['post']
>['requestBody']['content']['application/json'];

export const useArticleCreateForm = (option?: {
  /**
   * post成功時に発火する処理（モーダルを閉じるなどで利用）
   */
  submitSuccessCallback?: () => void;
}) => {
  const notifications = useNotifications();
  const navigate = useNavigate();
  const { clearSwrCacheByPath } = useClearSwrCacheByPath();
  const formSchema: ZodSchema<FormParams> = z.object({
    title: z.string().min(1, { message: formErrorMessages.required }),
    content: z.string().min(1, { message: formErrorMessages.required }),
  });

  const articleCreateForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onBlur',
  });

  const submitForm = articleCreateForm.handleSubmit(async (data) => {
    const { response } = await adminApiClient.POST('/articles', {
      body: data,
    });
    if (response.ok) {
      notifications.show(notificationMessages.createSuccess('Article'), {
        severity: 'success',
      });
      articleCreateForm.reset();
      // 忘れずにキャッシュを削除する
      clearSwrCacheByPath('/articles');
      navigate('/articles');
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
     * react hook formのform
     */
    articleCreateForm,
    /**
     * Submit処理
     */
    submitForm,
  };
};
