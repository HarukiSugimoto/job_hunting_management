import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-restricted-imports
import { SLFormContainer } from '../SLFormContainer';
// eslint-disable-next-line no-restricted-imports
import { SLFormTextfield } from '../SLFormTextfield';

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'SakuraLikeUI/components/mui/form/SLFormContainer',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLFormContainer,
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
} satisfies Meta<typeof SLFormContainer>;

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
  render: (args) => <SLFormContainer {...args} />,
  args: {
    label: 'メールアドレス',
    children: <div>taro123@example.com</div>,
  },
};

/**
 * TextFieldやSelect boxなど データの作成や編集フォームでForm部品と一緒に利用するのがメインの使い方
 */
export const WithTextfield: Story = {
  name: 'Form部品と一緒に利用',
  args: {
    label: 'メールアドレス',
    showRequired: true,
  },
  render: function Comp(args) {
    const { control } = useForm<{ email: string }>();

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <SLFormContainer {...args}>
        <SLFormTextfield control={control} name="email" type="email" />
      </SLFormContainer>
    );
  },
};
