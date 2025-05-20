/* eslint-disable no-restricted-imports */
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SLSignInFormCard, SLSignInFormCardProps } from '../SLSignInFormCard';

// Zodスキーマの定義
const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'メールアドレスを入力してください' })
    .email({ message: '有効なメールアドレスを入力してください' }),
  password: z
    .string()
    .min(1, { message: 'パスワードを入力してください' })
    .min(8, { message: 'パスワードは8文字以上で入力してください' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: '半角英数字を含む8文字以上で入力してください' }),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

const useSignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInErrorMessage, setSignInErrorMessage] = useState<string | null>(null);
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const toggleShowPassword = React.useCallback(() => setIsShowPassword((before) => !before), []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsSubmitting(true);
    setSignInErrorMessage(null); // Reset any previous error

    try {
      // ここに実際のログイン処理を実装します
      // eslint-disable-next-line no-console
      console.log('Form submitted:', data);

      // 実際のAPIコールをシミュレート
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // パスワードが "password1234" の場合のみ成功
      if (data.password === 'password1234') {
        // 成功時の処理
        // eslint-disable-next-line no-console
        console.log('Login successful');
      } else {
        // 失敗時の処理
        throw new Error('メールアドレスまたはパスワードが正しくありません');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Login failed:', error);
      setSignInErrorMessage(error instanceof Error ? error.message : 'ログインに失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    isSubmitting,
    errors,
    signInErrorMessage,
    handleSubmit: handleSubmit(onSubmit),
    isShowPassword,
    toggleShowPassword,
  };
};

const SampleSignInForm = (
  arg: Omit<
    SLSignInFormCardProps,
    'control' | 'handleSubmit' | 'toggleShowPassword' | 'isShowPassword'
  >
) => {
  const {
    isSubmitting,
    errors,
    signInErrorMessage,
    control,
    handleSubmit,
    isShowPassword,
    toggleShowPassword,
  } = useSignInForm();

  return (
    <SLSignInFormCard
      control={control}
      errors={arg.errors || errors}
      handleSubmit={handleSubmit}
      isShowPassword={isShowPassword}
      isSubmitting={arg.isSubmitting || isSubmitting}
      logoSrcDark={arg.logoSrcDark}
      logoSrcLight={arg.logoSrcLight}
      signInErrorMessage={arg.signInErrorMessage || signInErrorMessage}
      title={arg.title}
      toggleShowPassword={toggleShowPassword}
    />
  );
};

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'SakuraLikeUI/components/SLSignInFormCard',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SampleSignInForm,
  /**
   * 自動でドキュメントを生成。詳細は以下を参照。
   * https://storybook.js.org/docs/react/writing-docs/autodocs
   */
  tags: ['autodocs'],
  parameters: {
    /**
     * "padded", "centered", "fullscreen"
     * Storybook のデフォルトは "padded" なので理由がなければ "padded" を使う。
     */
    layout: 'centered',
    /**
     * デフォルトのビューポートを指定
     * Storybook のデフォルトは "responsive" なので理由がなければ "responsive" を使う。
     * "responsive" | "mobile1" (Small mobile) | "mobile2" (Large mobile) | "tablet"
     */
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component:
          'サンプルは`password1234`を入力すると成功し、それ以外のパスワードを入力すると失敗します',
      },
    },
  },

  /**
   * controlを無効にしたい場面などはここを変更する
   */
  argTypes: {},
} satisfies Meta<typeof SampleSignInForm>;

export default meta;

// StoryObj の型を定義
type Story = StoryObj<typeof meta>;

/**
 * 基本
 */
export const Default: Story = {
  /**
   * デフォルト以外の名前をつける場合は日本語でどんなストーリーかわかるように命名すること
   * サイドバーの文字数が少ないため、短い名前をつけること
   */
  name: 'Default',
  parameters: {
    backgrounds: {
      /**
       * Darkモード指定するときは"Dark"
       * デフォルトで背景は完全な白なのでlightモードの背景色グレーで確認したい場合は"Light"を指定してください
       */
      default: 'Light',
    },
  },
  /**
   * stateなどの設定が必要ならrender内で設定する
   */
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SampleSignInForm {...args} />,
  args: {
    title: 'サービスネーム',
    logoSrcLight: 'https://picsum.photos/100',
    isSubmitting: false,
    signInErrorMessage: null,
    errors: {
      email: undefined,
      password: undefined,
    },
  },
};

/**
 * Darkモード
 */
export const Dark: Story = {
  /**
   * デフォルト以外の名前をつける場合は日本語でどんなストーリーかわかるように命名すること
   * サイドバーの文字数が少ないため、短い名前をつけること
   */
  name: 'Darkモード',
  parameters: {
    backgrounds: {
      /**
       * Darkモード指定するときは"Dark"
       * デフォルトで背景は完全な白なのでlightモードの背景色グレーで確認したい場合は"Light"を指定してください
       */
      default: 'Dark',
    },
  },
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SampleSignInForm {...args} />,
  args: {
    title: 'サービスネーム',
    logoSrcLight: 'https://picsum.photos/100',
    isSubmitting: false,
    signInErrorMessage: null,
    errors: {
      email: undefined,
      password: undefined,
    },
  },
};

/**
 * 画像のロゴなし
 */
export const NoImage: Story = {
  /**
   * デフォルト以外の名前をつける場合は日本語でどんなストーリーかわかるように命名すること
   * サイドバーの文字数が少ないため、短い名前をつけること
   */
  name: '画像のロゴなし',
  parameters: {
    backgrounds: {
      /**
       * Darkモード指定するときは"Dark"
       * デフォルトで背景は完全な白なのでlightモードの背景色グレーで確認したい場合は"Light"を指定してください
       */
      default: 'Light',
    },
  },
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SampleSignInForm {...args} />,
  args: {
    title: 'サービスネーム',
    isSubmitting: false,
    signInErrorMessage: null,
    errors: {
      email: undefined,
      password: undefined,
    },
  },
};

/**
 * 送信中
 */
export const Submitting: Story = {
  /**
   * デフォルト以外の名前をつける場合は日本語でどんなストーリーかわかるように命名すること
   * サイドバーの文字数が少ないため、短い名前をつけること
   */
  name: '送信中',
  parameters: {
    backgrounds: {
      /**
       * Darkモード指定するときは"Dark"
       * デフォルトで背景は完全な白なのでlightモードの背景色グレーで確認したい場合は"Light"を指定してください
       */
      default: 'Light',
    },
  },
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SampleSignInForm {...args} />,
  args: {
    title: 'サービスネーム',
    logoSrcLight: 'https://picsum.photos/100',
    isSubmitting: true,
    signInErrorMessage: null,
    errors: {
      email: undefined,
      password: undefined,
    },
  },
};

/**
 * validationエラー
 */
export const ValidationError: Story = {
  /**
   * デフォルト以外の名前をつける場合は日本語でどんなストーリーかわかるように命名すること
   * サイドバーの文字数が少ないため、短い名前をつけること
   */
  name: 'validationエラー',
  parameters: {
    backgrounds: {
      /**
       * Darkモード指定するときは"Dark"
       * デフォルトで背景は完全な白なのでlightモードの背景色グレーで確認したい場合は"Light"を指定してください
       */
      default: 'Light',
    },
  },
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SampleSignInForm {...args} />,
  args: {
    title: 'サービスネーム',
    logoSrcLight: 'https://picsum.photos/100',
    isSubmitting: false,
    signInErrorMessage: null,
    errors: {
      email: { message: 'メールアドレスを入力してください', type: 'required' },
      password: { message: 'パスワードを入力してください', type: 'required' },
    },
  },
};

/**
 * 認証失敗
 */
export const SignInError: Story = {
  /**
   * デフォルト以外の名前をつける場合は日本語でどんなストーリーかわかるように命名すること
   * サイドバーの文字数が少ないため、短い名前をつけること
   */
  name: '認証失敗',
  parameters: {
    backgrounds: {
      /**
       * Darkモード指定するときは"Dark"
       * デフォルトで背景は完全な白なのでlightモードの背景色グレーで確認したい場合は"Light"を指定してください
       */
      default: 'Light',
    },
  },
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SampleSignInForm {...args} />,
  args: {
    title: 'サービスネーム',
    logoSrcLight: 'https://picsum.photos/100',
    isSubmitting: false,
    signInErrorMessage: 'メールアドレスまたはパスワードが正しくありません',
    errors: {
      email: undefined,
      password: undefined,
    },
  },
};
