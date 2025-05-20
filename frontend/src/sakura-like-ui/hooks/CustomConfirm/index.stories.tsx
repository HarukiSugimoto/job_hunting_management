import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
// eslint-disable-next-line no-restricted-imports
import { useCustomConfirm } from '../CustomConfirm';
// eslint-disable-next-line no-restricted-imports
import { CustomConfirmProvider } from './customConfirmContext';

/**
 * CustomConfirm を使ったボタンコンポーネント
 * Storybook 上で useCustomConfirm の挙動を確認するためのサンプル
 */
const ConfirmButton: React.FC = () => {
  const { customConfirm } = useCustomConfirm();
  const [result, setResult] = useState<string | null>(null);

  const handleClick = async () => {
    const confirmed = await customConfirm({
      title: '削除の確認',
      description: 'このデータを削除してもよろしいですか？',
      positiveButtonLabel: '削除する',
      negativeButtonLabel: 'キャンセル',
    });

    setResult(confirmed ? '✅ 削除されました' : '❌ キャンセルされました');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <button style={{ fontSize: 16, padding: '8px 16px' }} type="button" onClick={handleClick}>
        削除する
      </button>
      {result && (
        <p style={{ marginTop: 20 }}>
          結果: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
};

/**
 * Context でラップしたデモ用コンポーネント
 */
const ConfirmButtonWithProvider: React.FC = () => (
  <CustomConfirmProvider>
    <ConfirmButton />
  </CustomConfirmProvider>
);

const meta = {
  title: 'SakuraLikeUI/hooks/useCustomConfirm',
  component: ConfirmButtonWithProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### useCustomConfirm フック

このフックは、共通の確認ダイアログ（モーダル）を任意の場所から簡単に呼び出すためのカスタムフックです。

---

### 特徴

- Promiseベースで使える: \`const result = await customConfirm(...)\`
- 任意のラベルや文言を指定可能
- OK/キャンセルの結果を boolean で返す
- Provider を使ってアプリ全体に共通の確認 UI を提供

---

### 使用方法

\`\`\`tsx
const { customConfirm } = useCustomConfirm();
const result = await customConfirm({
  title: '確認',
  description: '本当に実行しますか？',
});
\`\`\`

### 注意点

- \`useCustomConfirm\` は \`CustomConfirmProvider\` の内部でのみ使用可能です。
- Provider でアプリケーション全体を囲む必要があります。
        `,
      },
    },
  },
} satisfies Meta<typeof ConfirmButtonWithProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '確認ダイアログの基本動作',
};
