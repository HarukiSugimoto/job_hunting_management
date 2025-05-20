import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line no-restricted-imports
import { SLInfoItem } from '../SLInfoItem';

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'SakuraLikeUI/components/mui/SLInfoItem',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLInfoItem,
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

  /**
   * controlを無効にしたい場面などはここを変更する
   */
  argTypes: {},
} satisfies Meta<typeof SLInfoItem>;

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
  render: (args) => <SLInfoItem {...args} />,
  args: {
    label: '項目名',
    data: 'サンプルデータ',
  },
};

/**
 * ローディング中
 */
export const Loading: Story = {
  name: 'ローディング中',
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SLInfoItem {...args} />,
  args: {
    label: '項目名',
    data: 'サンプルデータ',
    isLoading: true,
  },
};

/**
 * ローディング中でSkeletonの種類を指定
 */
export const LoadingWithSkeletonVariant: Story = {
  name: 'スケルトンを変更',
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SLInfoItem {...args} />,
  args: {
    label: '項目名',
    data: 'サンプルデータ',
    isLoading: true,
    skeletonVariant: 'rectangular',
  },
};
