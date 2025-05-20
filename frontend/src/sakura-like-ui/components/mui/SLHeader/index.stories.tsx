import { Box, Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
// eslint-disable-next-line no-restricted-imports
import { SLHeader } from './index';

// react-router-domのLinkを使用するため、MemoryRouterでラップするデコレーター
const withRouter = (Story: React.ComponentType) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'SakuraLikeUI/components/mui/SLHeader',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLHeader,
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
   * コンポーネントを使用するのに必要なコンテキストプロバイダーなどをここで設定
   */
  decorators: [withRouter],
  /**
   * controlを変更したい場合に使う
   */
  argTypes: {},
} satisfies Meta<typeof SLHeader>;

export default meta;

// StoryObj の型を定義
type Story = StoryObj<typeof meta>;

/**
 * 基本
 */
export const Default: Story = {
  name: '基本',
  args: {
    rightContent: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button color="inherit" variant="outlined">
          サンプル
        </Button>
      </Box>
    ),
    leftContent: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button color="inherit" variant="outlined">
          タイトルとか
        </Button>
      </Box>
    ),
    onMenuToggle: () => {},
  },
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SLHeader {...args} />,
};

/**
 * ダークモード
 */
export const Dark: Story = {
  name: 'ダークモード',
  parameters: {
    backgrounds: {
      /**
       * Darkモード指定するときは"Dark"
       * デフォルトで背景は完全な白なのでlightモードの背景色グレーで確認したい場合は"Light"を指定してください
       */
      default: 'Dark',
    },
  },
  args: {
    rightContent: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button color="inherit" variant="outlined">
          サンプル
        </Button>
      </Box>
    ),
    leftContent: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button color="inherit" variant="outlined">
          タイトルとか
        </Button>
      </Box>
    ),
    onMenuToggle: () => {},
  },
  // eslint-disable-next-line react/jsx-props-no-spreading
  render: (args) => <SLHeader {...args} />,
};
