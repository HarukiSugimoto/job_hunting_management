import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-restricted-imports
import { SLFormCheckboxGroup } from '../SLFormCheckboxGroup';
// eslint-disable-next-line no-restricted-imports
import { SLFormContainer } from '../SLFormContainer';

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
  title: 'SakuraLikeUI/components/mui/form/SLFormCheckboxGroup',
  component: SLFormCheckboxGroup,

  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  argTypes: {
    control: {
      control: false,
      // table: { disable: true }, // ←テーブルから消したい場合はコメント解除
    },
  },
} satisfies Meta<typeof SLFormCheckboxGroup>;

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
    return <SLFormCheckboxGroup {...args} control={control} />;
  },
  args: {
    options,
    name: 'name',
  },
};

/**
 * エラー時
 */
export const SLFormCheckboxGroupError: Story = {
  name: 'エラー時',
  args: {
    options,
    name: 'name',
  },
  render: function Comp(args) {
    const { control, setError } = useForm();
    setError(args.name, { type: 'custom', message: 'Message error validation' });

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormCheckboxGroup {...args} control={control} />;
  },
};

const disabledOptions = [
  {
    value: 'a',
    label: 'サンプル 1',
  },
  {
    value: 'b',
    label: 'サンプル 2',
    disabled: true,
  },
  {
    value: 'c',
    label: 'サンプル 3',
  },
];

/**
 * 選択肢が一部disabledの時
 */
export const DisabledOption: Story = {
  name: '選択肢が一部disabled',
  args: {
    options: disabledOptions,
    name: 'name',
  },
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormCheckboxGroup {...args} control={control} />;
  },
};

/**
 * disabledの時
 */
export const Disabled: Story = {
  name: '全体disabled',
  args: {
    options,
    name: 'name',
    disabled: true,
  },
  render: function Comp(args) {
    const { control } = useForm();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SLFormCheckboxGroup {...args} control={control} />;
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
      <SLFormContainer label="選択する値にチェックを入れてください">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <SLFormCheckboxGroup {...args} control={control} />
      </SLFormContainer>
    );
  },
  args: {
    options,
    name: 'name',
  },
};
