'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNotifications } from '@toolpad/core/useNotifications';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSessionContext } from '@/contexts/sessionContext';
import { adminApiClient } from '@/external';
import { formErrorMessages } from '@/sakura-like-ui/constants/formErrorMessages';

// Zodスキーマの定義
const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: formErrorMessages.required })
    .email({ message: formErrorMessages.invalidEmail }),
  password: z
    .string()
    .min(1, { message: formErrorMessages.emptyPassword })
    .min(8, { message: formErrorMessages.invalidPassword })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: formErrorMessages.invalidPassword }),
});

export const useSignInForm = (option?: { submitSuccessCallback: () => void }) => {
  const [signInErrorMessage, setSignInErrorMessage] = useState<string | null>(null);
  const [isLoginSucceeded, setIsLoginSucceeded] = React.useState(false);
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const toggleShowPassword = React.useCallback(() => setIsShowPassword((before) => !before), []);
  const { refetchSession } = useSessionContext();
  const notifications = useNotifications();
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const submitForm = signInForm.handleSubmit(async (data) => {
    setSignInErrorMessage(null);
    try {
      const { response } = await adminApiClient.POST('/auth/login', {
        body: {
          email: data.email,
          password: data.password,
        },
      });
      if (response.ok) {
        refetchSession();
        setTimeout(() => {
          // 処理完了後、リダイレクトするまで少しラグがあるので少し遅らせてsnackbarを表示する
          notifications.show('ログインしました', {
            severity: 'success',
            autoHideDuration: 3000,
          });
        }, 1000);
        setIsLoginSucceeded(true);
        if (option?.submitSuccessCallback) {
          option.submitSuccessCallback();
        }
      } else {
        setSignInErrorMessage('ログインに失敗しました');
      }
    } catch (error) {
      setSignInErrorMessage(error instanceof Error ? error.message : 'ログインに失敗しました');
    }
  });

  return {
    control: signInForm.control,
    isShowPassword,
    toggleShowPassword,
    isSubmitting: signInForm.formState.isSubmitting || isLoginSucceeded,
    errors: signInForm.formState.errors,
    signInErrorMessage,
    submitForm,
  };
};
