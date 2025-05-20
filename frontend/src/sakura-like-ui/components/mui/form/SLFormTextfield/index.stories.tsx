import { EmailOutlined } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
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
  title: 'SakuraLikeUI/components/mui/form/SLFormTextfield',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLFormTextfield,
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
    control: {
      control: false,
      // table: { disable: true }, // ←テーブルから消したい場合はコメント解除
    },
    slotProps: {
      control: false,
      // table: { disable: true }, // ←テーブルから消したい場合はコメント解除
    },
    shouldUnregister: {
      control: false,
      // table: { disable: true }, // ←テーブルから消したい場合はコメント解除
    },
    rules: {
      control: false,
      // table: { disable: true }, // ←テーブルから消したい場合はコメント解除
    },
  },
} satisfies Meta<typeof SLFormTextfield>;

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
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormTextfield {...args} control={control} />;
  },
  args: {
    placeholder: 'Please enter text',
    name: 'sample',
  },
};

/**
 * エラー発生時
 */
export const ErrorState: Story = {
  name: 'エラー時',
  render: function Comp(args) {
    const { control, setError } = useForm();
    setError(args.name, { type: 'custom', message: 'Error text' });

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormTextfield {...args} control={control} />;
  },
  args: {
    placeholder: 'Please enter text',
    type: 'text',
    name: 'sample',
    disabled: false,
  },
};

/**
 * 入力内容や要件に応じて幅を変更する場合
 *
 * full | sm | md | lg (デフォルトは md)
 */
export const SetWidthType: Story = {
  name: '幅を指定する時',
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormTextfield {...args} control={control} />;
  },
  args: {
    placeholder: 'Please enter text',
    type: 'text',
    name: 'sample',
    disabled: false,
    widthType: 'sm',
  },
};

/**
 * アイコンを表示する場合
 *
 * 詳細は https://mui.com/material-ui/api/text-field/ を参照
 */
export const IconState: Story = {
  name: 'With アイコン',
  args: {
    placeholder: 'Please enter text',
    type: 'text',
    name: 'input',
    disabled: false,
    slotProps: {
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <EmailOutlined />
          </InputAdornment>
        ),
      },
    },
  },
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormTextfield {...args} control={control} />;
  },
};

/**
 * Disabled
 */
export const Disabled: Story = {
  name: 'Disabled',
  args: {
    placeholder: 'Please enter text',
    type: 'text',
    name: 'input',
    disabled: true,
  },
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormTextfield {...args} control={control} />;
  },
};

/**
 * ラベルあり
 */
export const WithLabel: Story = {
  name: 'ラベルあり',
  args: {
    placeholder: 'Please enter text',
    type: 'text',
    name: 'input',
    disabled: false,
    label: 'ラベル',
  },
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormTextfield {...args} control={control} />;
  },
};

/**
 * SLFormContainerを使用した場合
 */
export const WithSLFormContainer: Story = {
  name: 'With SLFormContainer',
  args: {
    placeholder: 'Please enter text',
    type: 'text',
    name: 'input',
    disabled: false,
  },
  render: function Comp(args) {
    const { control } = useForm();

    return (
      <SLFormContainer label="Input label" showRequired={true}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <SLFormTextfield {...args} control={control} />
      </SLFormContainer>
    );
  },
};
