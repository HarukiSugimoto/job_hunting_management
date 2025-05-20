import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line no-restricted-imports
import { SLPageContainer } from './index';

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'SakuraLikeUI/components/mui/SLPageContainer',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLPageContainer,
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
  argTypes: {
    children: {
      control: false,
      // table: { disable: true }, // ←テーブルから消したい場合はコメント解除
    },
  },
} satisfies Meta<typeof SLPageContainer>;

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
  render: (args) => <SLPageContainer {...args} />,
  args: {
    title: 'Page Title',
    children: (
      <div>
        <p>This is the content of the SLPageContainer.</p>
        <ul>
          <li>Sample content</li>
          <li>Sample content</li>
          <li>Sample content</li>
        </ul>
      </div>
    ),
  },
};

/**
 * タイトルが設定されていないストーリー
 */
export const NoTitle: Story = {
  name: 'タイトルなし',
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SLPageContainer {...args} />,
  args: {
    // title がないパターン
    children: (
      <div>
        <p>This is the content of the SLPageContainer (no title).</p>
        <ul>
          <li>Sample content</li>
          <li>Sample content</li>
          <li>Sample content</li>
        </ul>
      </div>
    ),
  },
};

/**
 * タイトルの右側にコンテンツがあるストーリー
 */
export const TitleRightContent: Story = {
  name: 'タイトルの右側にコンテンツがある',
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SLPageContainer {...args} />,
  args: {
    title: 'Page Title',
    titleRightContent: <Button variant="contained">Button</Button>,
    children: (
      <div>
        <p>This is the content of the SLPageContainer (no title).</p>
        <ul>
          <li>Sample content</li>
          <li>Sample content</li>
          <li>Sample content</li>
        </ul>
      </div>
    ),
  },
};
