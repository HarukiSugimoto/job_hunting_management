import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-restricted-imports
import { SLFormCheckbox } from '../SLFormCheckbox';

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'SakuraLikeUI/components/mui/form/SLFormCheckbox',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLFormCheckbox,
  /**
   * 自動でドキュメントを生成。詳細は以下を参照。
   * https://storybook.js.org/docs/react/writing-docs/autodocs
   */
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
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
    },
  },
} satisfies Meta<typeof SLFormCheckbox>;

export default meta;

// StoryObj の型を定義
type Story = StoryObj<typeof meta>;

/**
 * 基本
 */
export const Default: Story = {
  name: 'Default',
  args: {
    name: 'agreement',
    valueLabel: 'サンプル',
    value: true,
  },
  render: function Comp(args) {
    const { control } = useForm();
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormCheckbox {...args} control={control} />;
  },
};

/**
 * エラー発生時
 */
export const ErrorState: Story = {
  name: 'エラー時',
  render: function Comp(args) {
    const { control, setError } = useForm();
    setError(args.name, { type: 'custom', message: 'チェックは必須です' });

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormCheckbox {...args} control={control} />;
  },
  args: {
    name: 'agreement',
    valueLabel: 'サンプル',
    value: true,
  },
};

/**
 * 長文テキストの時
 */
export const LongText: Story = {
  name: '長文',
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormCheckbox {...args} control={control} />;
  },
  args: {
    name: 'agreement',
    valueLabel:
      '長文テキストが入ります。あいうえおかきくけこ。こんにちは。This is a sample text.あいうえおかきくけこ。こんにちは。This is a sample text.あいうえおかきくけこ。こんにちは。This is a sample text.あいうえおかきくけこ。こんにちは。This is a sample text.あいうえおかきくけこ。こんにちは。This is a sample text.あいうえおかきくけこ。こんにちは。This is a sample text.あいうえおかきくけこ。こんにちは。This is a sample text.',
    value: true,
  },
};
