import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';

/* eslint-disable no-restricted-imports */
import { NotFoundProvider } from './notFoundContext';
import { useNotFound } from './index';
/* eslint-enable no-restricted-imports */

// 404ページのモックコンポーネント
const NotFound404Page: React.FC = () => (
  <div
    style={{
      fontFamily: 'sans-serif',
      padding: 20,
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: 8,
      marginTop: 20,
    }}
  >
    <h1 style={{ color: '#dc3545' }}>404</h1>
    <h2>ページが見つかりませんでした</h2>
    <p>お探しのページは存在しないか、削除された可能性があります。</p>
  </div>
);

/**
 * useNotFound を使ったサンプルコンポーネント
 * Storybook 上で useNotFound の挙動を確認するためのサンプル
 */
const NotFoundDemo: React.FC = () => {
  const { notFound } = useNotFound();
  const [triggered, setTriggered] = useState(false);

  const handleClick = () => {
    notFound();
    setTriggered(true);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <h3>データ詳細ページ</h3>
      <p>このページは通常のコンテンツを表示しています。</p>
      <p>「データが見つからない」ボタンをクリックすると、404ページに切り替わります。</p>

      <button
        disabled={triggered}
        style={{
          fontSize: 16,
          padding: '8px 16px',
          backgroundColor: triggered ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: triggered ? 'not-allowed' : 'pointer',
        }}
        type="button"
        onClick={handleClick}
      >
        データが見つからない
      </button>

      {triggered && (
        <p style={{ marginTop: 10, color: '#6c757d' }}>
          notFound()が呼び出されました。本来はここで404ページが表示されます。
        </p>
      )}
    </div>
  );
};

// メインのコンテンツ部分
const MainContent: React.FC = () => (
  <Routes>
    <Route element={<NotFoundDemo />} path="/" />
    <Route element={<NotFound404Page />} path="/404" />
    <Route element={<Navigate to="/404" />} path="*" />
  </Routes>
);

/**
 * Context と Router でラップしたデモ用コンポーネント
 */
const NotFoundDemoWithProvider: React.FC = () => (
  <MemoryRouter>
    <NotFoundProvider>
      <MainContent />
    </NotFoundProvider>
  </MemoryRouter>
);

const meta = {
  title: 'SakuraLikeUI/hooks/useNotFound',
  component: NotFoundDemoWithProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### useNotFound フック

このフックは、データが見つからない場合など404ページを表示するための簡単な方法を提供します。

---

### 特徴

- コンポーネント内から簡単に404ページに切り替えられる
- ページ遷移時に自動的にリセットされる
- Provider を使ってアプリ全体で統一された404ハンドリングを提供

---

### 使用方法

\`\`\`tsx
const { notFound } = useNotFound();

// データが見つからない場合などに呼び出す
if (!data) {
  notFound();
  return null; // または適切なローディング表示
}
\`\`\`

### 注意点

- \`useNotFound\` は \`NotFoundProvider\` の内部でのみ使用可能です。
- Provider でアプリケーション全体を囲む必要があります。
- 通常はデータ取得後の条件分岐で使用します。
- react router 使用時のみ使えるHookです。
        `,
      },
    },
  },
} satisfies Meta<typeof NotFoundDemoWithProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '404エラーハンドリングの基本動作',
};
