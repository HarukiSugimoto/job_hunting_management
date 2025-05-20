import { zodResolver } from '@hookform/resolvers/zod';
import { useNotifications } from '@toolpad/core/useNotifications';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { ZodSchema } from 'zod';
import { adminApiClient, AdminApiPaths } from '@/external';
import { useClearSwrCacheByPath } from '@/hooks/common/useClearSwrCacheByPath';
import { useGetArticle } from '@/hooks/domain/(authenticated)/article/useGetArticle';
import { formErrorMessages } from '@/sakura-like-ui/constants/formErrorMessages';
import { notificationMessages } from '@/sakura-like-ui/constants/notificationMessages';

type FormParams = Required<
  AdminApiPaths['/articles/{article}']['post']
>['requestBody']['content']['application/json'];

export const useArticleUpdateForm = (
  articleId: number,
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
  const { article } = useGetArticle({ path: { article: articleId } });
  const formSchema: ZodSchema<FormParams> = z.object({
    title: z.string().min(1, { message: formErrorMessages.required }),
    content: z.string().min(1, { message: formErrorMessages.required }),
  });

  const articleUpdateForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || '',
      content: article?.content || '',
    },
    mode: 'onBlur',
  });

  // デフォルト値の設定処理
  React.useEffect(() => {
    if (article) {
      articleUpdateForm.reset({
        title: article?.title,
        content: article?.content,
      });
      setIsInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  const submitForm = articleUpdateForm.handleSubmit(async (data) => {
    const { response } = await adminApiClient.POST('/articles/{article}', {
      params: {
        path: {
          article: articleId,
        },
      },
      body: data,
    });
    if (response.ok) {
      notifications.show(notificationMessages.updateSuccess('Article'), {
        severity: 'success',
      });
      // リストページのキャッシュを削除
      clearSwrCacheByPath('/articles');
      // 詳細ページのキャッシュを削除
      clearSwrCacheByPath('/articles/{article}', {
        path: {
          article: article?.id,
        },
      });
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
     * フェッチ、初期化処理が完了しているか
     */
    isInitialized,
    /**
     * react hook formのform
     */
    articleUpdateForm,
    /**
     * 編集対象のデータ
     */
    targetArticle: article,
    /**
     * Submit処理
     */
    submitForm,
  };
};
