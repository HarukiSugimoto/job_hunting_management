import { Avatar, Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line no-restricted-imports
import { SLDataTable, type SLDataTableColumn } from './index';

// サンプルデータの型定義
interface SampleData {
  id: string;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive';
  avatarUrl?: string;
}

// サンプルデータ
const sampleData: SampleData[] = [
  {
    id: '1',
    name: '山田 太郎',
    email: 'yamada.taro@example.com',
    age: 32,
    status: 'active',
    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
  },
  {
    id: '2',
    name: '鈴木 花子',
    email: 'suzuki.hanako@example.com',
    age: 28,
    status: 'active',
    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: '3',
    name: '佐藤 次郎',
    email: 'sato.jiro@example.com',
    age: 45,
    status: 'inactive',
    avatarUrl: 'https://mui.com/static/images/avatar/3.jpg',
  },
  {
    id: '4',
    name: '田中 美咲',
    email: 'tanaka.misaki@example.com',
    age: 23,
    status: 'active',
    avatarUrl: 'https://mui.com/static/images/avatar/4.jpg',
  },
  {
    id: '5',
    name: '高橋 健太',
    email: 'takahashi.kenta@example.com',
    age: 36,
    status: 'inactive',
    avatarUrl: 'https://mui.com/static/images/avatar/5.jpg',
  },
];

// サンプルカラム
const sampleColumns: SLDataTableColumn<SampleData>[] = [
  {
    id: 'name',
    label: '名前',
    render: (item) => item.name,
    sortable: true,
    width: 200,
    mobileOrder: 1,
  },
  {
    id: 'email',
    label: 'メールアドレス',
    render: (item) => item.email,
    sortable: true,
    width: 250,
    mobileOrder: 2,
  },
  {
    id: 'age',
    label: '年齢',
    render: (item) => `${item.age}歳`,
    sortable: true,
    width: 100,
    mobileOrder: 3,
  },
  {
    id: 'status',
    label: 'ステータス',
    render: (item) => (item.status === 'active' ? '有効' : '無効'),
    sortable: true,
    width: 100,
    mobileOrder: 4,
    mobileRender: (item) => (
      <span
        style={{
          color: item.status === 'active' ? '#00C853' : '#FF5252',
          fontWeight: 'bold',
        }}
      >
        {item.status === 'active' ? '✓ 有効' : '✕ 無効'}
      </span>
    ),
  },
];

// 画像を含むカラム
const columnsWithAvatar: SLDataTableColumn<SampleData>[] = [
  {
    id: 'avatar',
    label: 'アイコン',
    render: (item) => (
      <Avatar alt={item.name} src={item.avatarUrl} sx={{ width: 40, height: 40 }} />
    ),
    width: 80,
    mobileOrder: 0,
    mobileRender: (item) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={item.name} src={item.avatarUrl} sx={{ width: 60, height: 60, mr: 2 }} />
        <Box>
          <Box sx={{ fontWeight: 'bold' }}>{item.name}</Box>
          <Box sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{item.email}</Box>
        </Box>
      </Box>
    ),
  },
  {
    id: 'name',
    label: '名前',
    render: (item) => item.name,
    sortable: true,
    width: 200,
    mobileOrder: -1, // モバイルでは表示しない（アバターと一緒に表示するため）
  },
  {
    id: 'email',
    label: 'メールアドレス',
    render: (item) => item.email,
    sortable: true,
    width: 250,
    mobileOrder: -1, // モバイルでは表示しない（アバターと一緒に表示するため）
  },
  {
    id: 'age',
    label: '年齢',
    render: (item) => `${item.age}歳`,
    sortable: true,
    width: 100,
    mobileOrder: 1,
  },
  {
    id: 'status',
    label: 'ステータス',
    render: (item) => (item.status === 'active' ? '有効' : '無効'),
    sortable: true,
    width: 100,
    mobileOrder: 2,
    mobileRender: (item) => (
      <span
        style={{
          color: item.status === 'active' ? '#00C853' : '#FF5252',
          fontWeight: 'bold',
        }}
      >
        {item.status === 'active' ? '✓ 有効' : '✕ 無効'}
      </span>
    ),
  },
];

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'SakuraLikeUI/components/mui/SLDataTable',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLDataTable,
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
    layout: 'padded',
    /**
     * デフォルトのビューポートを指定
     * Storybook のデフォルトは "responsive" なので理由がなければ "responsive" を使う。
     * "responsive" | "mobile1" (Small mobile) | "mobile2" (Large mobile) | "tablet"
     */
    viewport: {
      defaultViewport: 'responsive',
    },
  },
} as Meta<typeof SLDataTable>;

export default meta;

// StoryObj の型を定義
type Story = StoryObj<typeof meta>;

/**
 * 基本
 */
export const Default: Story = {
  name: 'Default',

  render: () => (
    <SLDataTable<SampleData>
      columns={sampleColumns}
      data={sampleData}
      defaultSortDirection="asc"
      defaultSortField="name"
      keyExtractor={(item) => item.id}
      totalCount={sampleData.length}
    />
  ),
};

/**
 * ローディング状態
 */
export const Loading: Story = {
  name: 'ローディング',

  render: () => (
    <SLDataTable<SampleData>
      columns={sampleColumns}
      data={[]}
      isLoading={true}
      keyExtractor={(item) => item.id}
      totalCount={0}
    />
  ),
};

/**
 * 空の状態
 */
export const Empty: Story = {
  name: '空データ',

  render: () => (
    <SLDataTable<SampleData>
      columns={sampleColumns}
      data={[]}
      emptyMessage="データがありません。"
      keyExtractor={(item) => item.id}
      totalCount={0}
    />
  ),
};

/**
 * ソート機能あり
 */
export const WithSorting: Story = {
  name: 'ソート機能',

  render: () => {
    const handleSort = (field: string, direction: 'asc' | 'desc') => {
      // eslint-disable-next-line no-console
      console.log(`Sort by ${field} in ${direction} order`);
    };

    return (
      <SLDataTable<SampleData>
        columns={sampleColumns}
        data={sampleData}
        defaultSortDirection="asc"
        defaultSortField="name"
        keyExtractor={(item) => item.id}
        totalCount={sampleData.length}
        onSort={handleSort}
      />
    );
  },
};

/**
 * 画像表示
 */
export const WithImages: Story = {
  name: '自由な要素を並べられます',

  render: () => (
    <SLDataTable<SampleData>
      columns={columnsWithAvatar}
      data={sampleData}
      defaultSortDirection="asc"
      defaultSortField="name"
      keyExtractor={(item) => item.id}
      totalCount={sampleData.length}
    />
  ),
};
