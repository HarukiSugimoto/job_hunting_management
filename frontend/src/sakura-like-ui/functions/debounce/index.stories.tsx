/* eslint-disable no-restricted-imports */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useCallback } from 'react';
import { debounce } from '../debounce';

/**
 * DebounceDemo Component
 *
 * ユーザーの入力に対して debounce を適用した動作を確認できる Storybook デモ用コンポーネントです。
 * 入力欄に文字を入力すると、最後の入力から指定時間が経過した後にのみ、出力欄に反映されます。
 *
 * これは API リクエストや重たい処理の実行頻度を減らす目的などで使われる debounce の仕組みを体験的に確認するのに適しています。
 */
// eslint-disable-next-line react/destructuring-assignment
const DebounceDemo = ({ wait }: { wait: number }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((value: string) => {
      setOutput(value);
    }, wait),
    [wait]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    debouncedUpdate(value);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 400 }}>
      <label>
        入力欄（最後の入力のみ反映）:
        <input
          style={{ width: '100%', marginTop: 8, padding: 4, fontSize: 16 }}
          type="text"
          value={input}
          onChange={handleChange}
        />
      </label>
      <p style={{ marginTop: 16 }}>出力（debounce 適用後）:</p>
      <div
        style={{
          border: '1px solid #ccc',
          padding: 8,
          minHeight: 40,
          background: '#f9f9f9',
        }}
      >
        {output}
      </div>
    </div>
  );
};

const meta = {
  title: 'SakuraLikeUI/functions/debounce',
  component: DebounceDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### debounce 関数の概要

**debounce** は、イベントが頻繁に発生する場面で「最後のイベントのみ」を実行するための関数です。
これはパフォーマンス最適化や無駄な処理の回避に役立ちます。

#### 典型的なユースケース:
- ユーザーが文字入力を行う際のAPI呼び出し
- リサイズイベントの最終時にのみ処理を行いたい場合
- スクロールに応じた処理を軽量化したい時

---

### 関数定義

\`\`\`ts
export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  ms: number
): ((...args: Parameters<T>) => Promise<ReturnType<T>>)
\`\`\`

#### 引数:
- \`callback\`: 遅延実行したい関数
- \`ms\`: 待機時間（ミリ秒）

#### 戻り値:
- debounceが適用された非同期関数（最後の実行のみ反映）

---

### デモの説明

この Story では、テキストボックスに入力された内容を debounce 処理後に出力欄に表示します。
「最後の入力から一定時間経過後にのみ」反映されるため、動作を体験的に理解できます。
        `,
      },
    },
  },
  argTypes: {
    wait: {
      control: { type: 'number', min: 100, max: 2000, step: 100 },
      description: 'debounce の待機時間（ミリ秒）。この値が大きいほど反映が遅くなります。',
      defaultValue: 500,
    },
  },
} satisfies Meta<typeof DebounceDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '基本動作（入力→反映）',
  args: {
    wait: 500,
  },
};
