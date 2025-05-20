import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
/* eslint-disable no-restricted-imports */
import { formatDate, formatDateDistance } from './index';
/* eslint-enable no-restricted-imports */

/**
 * FormatterDemo Component
 *
 * 日付フォーマット関数の動作を確認できるデモコンポーネント。
 * formatDateとformatDateDistanceの機能を一つのコンポーネント内でタブで切り替えて表示します。
 */
const FormatterDemo = () => {
  const [activeTab, setActiveTab] = useState<'formatDate' | 'formatDateDistance'>('formatDate');

  // formatDate用の状態
  const [dateForFormat, setDateForFormat] = useState<string>(new Date().toISOString());
  const formattedDate = formatDate(dateForFormat);

  // formatDateDistance用の状態
  const [dateForDistance, setDateForDistance] = useState<string>(new Date().toISOString());
  const distanceDate = formatDateDistance(dateForDistance);

  // 時間サンプル
  const now = new Date();
  const samples = [
    { label: '数分前', date: new Date(now.getTime() - 5 * 60 * 1000) },
    { label: '1時間前', date: new Date(now.getTime() - 60 * 60 * 1000) },
    { label: '今日の午前', date: new Date(new Date().setHours(8, 30, 0, 0)) },
    { label: '昨日', date: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
    { label: '1週間前', date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
    { label: '1ヶ月前', date: new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()) },
    { label: '1年前', date: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()) },
  ];

  // タブスタイル
  const tabStyle = {
    padding: '10px 20px',
    marginRight: '5px',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    background: 'transparent',
  };

  const activeTabStyle = {
    ...tabStyle,
    borderBottom: '2px solid #0066cc',
    color: '#0066cc',
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 500 }}>
      <div style={{ marginBottom: 20, borderBottom: '1px solid #eee' }}>
        <button
          style={activeTab === 'formatDate' ? activeTabStyle : tabStyle}
          type="button"
          onClick={() => setActiveTab('formatDate')}
        >
          formatDate
        </button>
        <button
          style={activeTab === 'formatDateDistance' ? activeTabStyle : tabStyle}
          type="button"
          onClick={() => setActiveTab('formatDateDistance')}
        >
          formatDateDistance
        </button>
      </div>

      {/* formatDate タブの内容 */}
      {activeTab === 'formatDate' && (
        <div>
          <h3 style={{ marginBottom: 16 }}>標準日付フォーマット</h3>
          <p>指定された日付を「YYYY年MM月DD日(曜日) HH:MM」形式に変換します。</p>

          <div style={{ marginBottom: 20 }}>
            <label>
              日付を選択:
              <input
                style={{ width: '100%', marginTop: 8, padding: 4, fontSize: 16 }}
                type="datetime-local"
                value={dateForFormat.slice(0, 16)}
                onChange={(e) => {
                  const newDate = new Date(e.target.value);
                  setDateForFormat(newDate.toISOString());
                }}
              />
            </label>
          </div>

          <div style={{ marginBottom: 16 }}>
            <h4>変換結果</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>
                    入力日時 (ISO):
                  </th>
                  <td style={{ padding: 8, borderBottom: '1px solid #ddd' }}>{dateForFormat}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>
                    formatDate結果:
                  </th>
                  <td style={{ padding: 8, borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                    {formattedDate}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* formatDateDistance タブの内容 */}
      {activeTab === 'formatDateDistance' && (
        <div>
          <h3 style={{ marginBottom: 16 }}>相対時間表示</h3>
          <p>指定された日付から現在までの経過時間を相対表現で表示します。</p>

          <div style={{ marginBottom: 20 }}>
            <label>
              日付を選択:
              <input
                style={{ width: '100%', marginTop: 8, padding: 4, fontSize: 16 }}
                type="datetime-local"
                value={dateForDistance.slice(0, 16)}
                onChange={(e) => {
                  const newDate = new Date(e.target.value);
                  setDateForDistance(newDate.toISOString());
                }}
              />
            </label>

            <div
              style={{ marginTop: 12, padding: 10, backgroundColor: '#f5f5f5', borderRadius: 4 }}
            >
              <strong>相対時間表示: </strong>
              <span style={{ fontSize: 18, color: '#0066cc' }}>{distanceDate}</span>
            </div>
          </div>

          <div>
            <h4>さまざまな時間の相対表示例</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>
                    時点
                  </th>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>
                    実際の日時
                  </th>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>
                    相対表示
                  </th>
                </tr>
              </thead>
              <tbody>
                {samples.map((sample) => (
                  <tr key={sample.label}>
                    <td style={{ padding: 8, borderBottom: '1px solid #ddd' }}>{sample.label}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #ddd' }}>
                      {formatDate(sample.date)}
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                      {formatDateDistance(sample.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const meta = {
  title: 'SakuraLikeUI/functions/formatter',
  component: FormatterDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### フォーマッター関数の概要

date-fnsライブラリを使用した日付フォーマット用のユーティリティ関数群です。
日本語での日付表示や相対時間表示を簡単に実装できます。

---

### 提供される関数

1. **formatDate** - 日付を「YYYY年MM月DD日(曜日) HH:MM」形式に変換
   - 引数: \`date: Date | string\` - 日付オブジェクトまたは日付文字列
   - 戻り値: フォーマットされた日付文字列

2. **formatDateDistance** - 現在時刻から見た相対時間表示（例: 「3日前」）
   - 引数: \`date: Date | string\` - 日付オブジェクトまたは日付文字列
   - 戻り値: 相対時間の文字列

---

### 使用例

\`\`\`ts
// 標準日付フォーマット
const formattedDate = formatDate(new Date()); 
// 例: "2023年5月1日(月) 15:30"

// 相対時間表示
const relativeTime = formatDateDistance("2023-04-25");
// 例: "5日前"
\`\`\`

### 特徴

- 日本語対応（date-fnsのjaロケールを使用）
- 日付と時刻の両方をサポート
- 日付文字列とDateオブジェクトの両方を受け入れ可能
        `,
      },
    },
  },
} satisfies Meta<typeof FormatterDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 両方の関数を表示するデモ
 */
export const Default: Story = {
  name: '日付フォーマット関数',
};
