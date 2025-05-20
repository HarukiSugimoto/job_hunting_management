import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-restricted-imports
import { SLFormContainer } from '../SLFormContainer';
// eslint-disable-next-line no-restricted-imports
import { SLFormSelect } from '../SLFormSelect';

// Sample Story options list
const options = [
  {
    value: '1',
    label: 'value 1',
  },
  {
    value: '2',
    label: 'value 2',
  },
  {
    value: '3',
    label: 'value 3',
  },
  {
    value: '4',
    label: 'value 4',
  },
];

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'SakuraLikeUI/components/mui/form/SLFormSelect',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLFormSelect,
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
} satisfies Meta<typeof SLFormSelect>;

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
    return <SLFormSelect {...args} control={control} />;
  },
  args: {
    options,
    name: 'name',
    showNonValueOption: true,
    defaultValue: '',
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
    return <SLFormSelect {...args} control={control} />;
  },
  args: {
    options,
    name: 'name',
    defaultValue: '2',
  },
};

/**
 * 未選択の選択肢を表示し、そのラベルを変更
 */
export const CustomNonValueLabel: Story = {
  name: '未選択ラベル変更',
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormSelect {...args} control={control} />;
  },
  args: {
    options,
    customNonValueLabel: '〇〇を選択',
    showNonValueOption: true,
    name: 'name',
    defaultValue: '',
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
    return <SLFormSelect {...args} control={control} />;
  },
  args: {
    options,
    name: 'name',
    showNonValueOption: true,
    defaultValue: '',
  },
};

/**
 * ラベルあり
 */
export const WithLabel: Story = {
  name: 'ラベルあり',
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormSelect {...args} control={control} />;
  },
  args: {
    options,
    name: 'name',
    showNonValueOption: true,
    defaultValue: '',
    label: 'ラベル',
  },
};

/**
 * 入力内容や要件に応じて幅を変更する場合
 *
 * full | sm | md | lg (デフォルトは md)
 */
export const WidthType: Story = {
  name: '幅を指定する時',
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormSelect {...args} control={control} />;
  },
  args: {
    options,
    name: 'name',
    defaultValue: '2',
    widthType: 'sm',
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
      <SLFormContainer label="Select box label" showRequired={true}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <SLFormSelect {...args} control={control} />
      </SLFormContainer>
    );
  },
  args: {
    options,
    name: 'name',
    showNonValueOption: true,
    defaultValue: '',
  },
};
