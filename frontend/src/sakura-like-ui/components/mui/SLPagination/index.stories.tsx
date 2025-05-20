import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { SLPagination } from '.';

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'SakuraLikeUI/components/mui/SLPagination',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLPagination,
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
     * "responsive" | "mobile" (Small mobile) | "mobile2" (Large mobile) | "tablet"
     */
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: `
SLPagination は、ページネーションボタン表示用のコンポーネント。

各ボタンは全てaタグ化したリンクになってる。

pageやpar_pageのクエリキーは変更できるので同一ページ内で複数のテーブルがあって違うクエリキーを使いたい場合などはそれを利用すること。
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],

  /**
   * controlを無効にしたい場面などはここを変更する
   */
  argTypes: {},
} satisfies Meta<typeof SLPagination>;

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
  /**
   * stateなどの設定が必要ならrender内で設定する
   */
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SLPagination {...args} />,
  args: {
    page: 1,
    totalCount: 100,
  },
};

/**
 * ローディング中
 */
export const IsLoading: Story = {
  /**
   * デフォルト以外の名前をつける場合は日本語でどんなストーリーかわかるように命名すること
   * サイドバーの文字数が少ないため、短い名前をつけること
   */
  name: '初回のローディング中',
  /**
   * stateなどの設定が必要ならrender内で設定する
   */
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SLPagination {...args} />,
  args: {
    page: 1,
  },
};

/**
 * URLクエリキーをカスタマイズ
 */
export const CustomQueryParams: Story = {
  name: 'クエリキー変更',
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SLPagination {...args} />,
  args: {
    page: 2,
    pageParamName: 'p',
    totalCount: 234,
    rowsPerPageOptions: [30, 50, 100],
    rowsPerPage: 30,
  },
};
