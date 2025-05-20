import { Button, Typography, Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
// eslint-disable-next-line no-restricted-imports
import { SLDialogFrame } from '../SLDialogFrame';

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'SakuraLikeUI/components/mui/SLDialogFrame',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLDialogFrame,
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
    },
    handleClose: {
      control: false,
    },
    negativeButtonAction: {
      control: false,
    },
    positiveButtonAction: {
      control: false,
    },
  },
} satisfies Meta<typeof SLDialogFrame>;

export default meta;

// StoryObj の型を定義
type Story = StoryObj<typeof meta>;

/**
 * 基本
 */
export const Default: Story = {
  name: 'デフォルト',
  args: {
    title: 'ダイアログのタイトル',
    labelPrefix: 'example',
    isOpen: false,
    children: <Typography sx={{ p: 3 }}>ダイアログの内容をここに表示します。</Typography>,
    handleClose: () => {},
    positiveButtonText: 'OK',
    negativeButtonText: 'キャンセル',
    disable: false,
    isLoading: false,
    maxWidth: 'xl',
    className: 'test-class',
  },
  render: function Comp(args) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    return (
      <>
        <Button variant="contained" onClick={handleOpen}>
          ダイアログを開く
        </Button>
        <SLDialogFrame
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...args}
          handleClose={handleClose}
          isOpen={isOpen}
          negativeButtonAction={handleClose}
          positiveButtonAction={() => alert('OKがクリックされました')}
        >
          {args.children}
        </SLDialogFrame>
      </>
    );
  },
};

/**
 * ローディング状態
 */
export const Loading: Story = {
  name: 'ローディング状態',
  args: {
    title: 'ローディング中',
    labelPrefix: 'loading-example',
    isOpen: false,
    children: (
      <Typography sx={{ p: 3 }}>
        ポジティブボタン（右下）にローディングインジケーターが表示されています。
      </Typography>
    ),
    handleClose: () => {},
    positiveButtonText: 'OK',
    negativeButtonText: 'キャンセル',
    disable: false,
    isLoading: true,
    maxWidth: 'xl',
    className: 'test-class',
  },
  render: function Comp(args) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    return (
      <>
        <Button variant="contained" onClick={handleOpen}>
          ダイアログを開く
        </Button>
        <SLDialogFrame
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...args}
          handleClose={handleClose}
          isOpen={isOpen}
          negativeButtonAction={handleClose}
          positiveButtonAction={() => alert('OKがクリックされました')}
        >
          {args.children}
        </SLDialogFrame>
      </>
    );
  },
};

/**
 * 無効状態
 */
export const Disabled: Story = {
  name: '無効状態',
  args: {
    title: '無効状態',
    labelPrefix: 'disabled-example',
    isOpen: false,
    children: <Typography sx={{ p: 3 }}>ボタンが無効になっています。</Typography>,
    handleClose: () => {},
    positiveButtonText: 'OK',
    negativeButtonText: 'キャンセル',
    disable: true,
    isLoading: false,
    maxWidth: 'xl',
    className: 'test-class',
  },
  render: function Comp(args) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    return (
      <>
        <Button variant="contained" onClick={handleOpen}>
          ダイアログを開く
        </Button>
        <SLDialogFrame
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...args}
          handleClose={handleClose}
          isOpen={isOpen}
          negativeButtonAction={handleClose}
          positiveButtonAction={() => alert('OKがクリックされました')}
        >
          {args.children}
        </SLDialogFrame>
      </>
    );
  },
};

/**
 * 最大幅の変更
 */
export const MaxWidth: Story = {
  name: '最大幅の変更',
  args: {
    title: '最大幅の変更',
    labelPrefix: 'max-width-example',
    isOpen: false,
    children: <Typography sx={{ p: 3 }}>ダイアログの幅が変更されています。</Typography>,
    handleClose: () => {},
    positiveButtonText: 'OK',
    negativeButtonText: 'キャンセル',
    disable: false,
    isLoading: false,
    maxWidth: 'sm',
    className: 'test-class',
  },
  render: function Comp(args) {
    const [isOpen, setIsOpen] = useState(false);
    const [maxWidth, setMaxWidth] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>(
      (args.maxWidth as 'xs' | 'sm' | 'md' | 'lg' | 'xl') || 'sm'
    );
    const widthList = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    const handleChangeWidth = () => {
      const currentIndex = widthList.indexOf(maxWidth);
      const nextIndex = (currentIndex + 1) % widthList.length;
      setMaxWidth(widthList[nextIndex]);
    };

    return (
      <>
        <Button variant="contained" onClick={handleOpen}>
          ダイアログを開く
        </Button>
        <SLDialogFrame
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...args}
          handleClose={handleClose}
          isOpen={isOpen}
          maxWidth={maxWidth}
          negativeButtonAction={handleClose}
          positiveButtonAction={() => alert('OKがクリックされました')}
        >
          <Box sx={{ p: 3 }}>
            <Typography gutterBottom>
              現在の最大幅: <strong>{maxWidth}</strong>
            </Typography>
            <Button color="primary" sx={{ mt: 2 }} variant="outlined" onClick={handleChangeWidth}>
              最大幅を変更する
            </Button>
          </Box>
        </SLDialogFrame>
      </>
    );
  },
};
