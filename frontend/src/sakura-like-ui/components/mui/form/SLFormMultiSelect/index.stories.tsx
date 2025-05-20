import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-restricted-imports
import { SLFormContainer } from '../SLFormContainer';
// eslint-disable-next-line no-restricted-imports
import { SLFormMultiSelect } from '../SLFormMultiSelect';

// Sample Story options list
const options = [
  {
    value: 8,
    label: '茨城県',
  },
  {
    value: 9,
    label: '栃木県',
  },
  {
    value: 10,
    label: '群馬県',
  },
  {
    value: 11,
    label: '埼玉県',
  },
  {
    value: 12,
    label: '千葉県',
  },
  {
    value: 13,
    label: '東京都',
  },
  {
    value: 14,
    label: '神奈川県',
  },
];

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'SakuraLikeUI/components/mui/form/SLFormMultiSelect',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLFormMultiSelect,
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
    shouldUnregister: {
      control: false,
      // table: { disable: true }, // ←テーブルから消したい場合はコメント解除
    },
    rules: {
      control: false,
      // table: { disable: true }, // ←テーブルから消したい場合はコメント解除
    },
  },
} satisfies Meta<typeof SLFormMultiSelect>;

export default meta;

// StoryObj の型を定義
type Story = StoryObj<typeof meta>;

/**
 * 基本
 */
export const Default: Story = {
  name: 'Default',
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormMultiSelect {...args} control={control} />;
  },
  args: {
    options,
    name: 'name',
  },
};

/**
 * 初期値を設定し
 * 未選択の選択肢を表示しない
 */
export const DefaultValue: Story = {
  name: '初期値あり',
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormMultiSelect {...args} control={control} />;
  },
  args: {
    options,
    name: 'name',
    defaultValue: [{ label: 'value 2', value: '2' }],
  },
};

/**
 * エラー時
 */
export const ErrorState: Story = {
  name: 'エラー時',
  render: function Comp(args) {
    const { control, setError } = useForm();
    setError(args.name, { type: 'custom', message: 'Error text' });

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormMultiSelect {...args} control={control} />;
  },
  args: {
    options,
    name: 'name',
  },
};

/**
 * SLFormContainerを使用した場合
 */
export const WithSLFormContainer: Story = {
  name: 'With SLFormContainer',
  render: function Comp(args) {
    const { control } = useForm();

    return (
      <SLFormContainer label="都道府県を選択してください(複数選択可)" showRequired={true}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <SLFormMultiSelect {...args} control={control} />
      </SLFormContainer>
    );
  },
  args: {
    options,
    name: 'name',
  },
};
