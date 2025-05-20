/* eslint-disable react/jsx-props-no-spreading */
import { Article, Settings } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { MemoryRouter } from 'react-router-dom';
// eslint-disable-next-line no-restricted-imports
import { SLSidebar } from './index';
// eslint-disable-next-line no-restricted-imports
import type { SLSidebarProps } from './index';

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
  title: 'SakuraLikeUI/components/mui/SLSidebar',
  /**
   * storyの対象となるcomponentを指定
   */
  component: SLSidebar,
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
    layout: 'fullscreen',
    /**
     * デフォルトのビューポートを指定
     * Storybook のデフォルトは "responsive" なので理由がなければ "responsive" を使う。
     * "responsive" | "mobile1" (Small mobile) | "mobile2" (Large mobile) | "tablet"
     */
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: `
### 管理画面のサイドバーコンポーネント
- **特徴**
  - メニュー項目は階層構造を持つことができる
  - 下部に固定メニューを持つことができる
  - モバイル表示ではオーバーレイで表示される
  - サイドバーを開くと、メインコンテンツは右に移動する
  - 上部に少しスペースがあるが、これはアプリケーションのヘッダー部分に合わせるため
  `,
      },
    },
  },
  /**
   * コンポーネントを使用するのに必要なコンテキストプロバイダーなどをここで設定
   */
  decorators: [withRouter],
  /**
   * controlを変更したい場合に使う
   */
  argTypes: {
    open: {
      control: 'boolean',
      description: 'サイドバーの開閉状態',
    },
    drawerWidth: {
      control: { type: 'number', min: 200, max: 500, step: 10 },
      description: 'サイドバーの幅（px）',
    },
    menuItems: {
      control: 'object',
      description: 'メニュー項目',
    },
    onClose: {
      action: 'closed',
      description: 'サイドバーを閉じる際のコールバック',
    },
  },
} satisfies Meta<typeof SLSidebar>;

export default meta;

// StoryObj の型を定義
type Story = StoryObj<typeof meta>;

const SampleRender: React.FC<SLSidebarProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.open);

  const handleClose = () => {
    setIsOpen(false);
    if (args.onClose) args.onClose();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', height: '400px', position: 'relative' }}>
      <SLSidebar
        bottomMenuItems={args.bottomMenuItems}
        drawerWidth={args.drawerWidth}
        menuItems={args.menuItems}
        open={isOpen}
        onClose={handleClose}
      />
      <Box sx={{ p: 2, flexGrow: 1, ml: isOpen ? `${args.drawerWidth}px` : 0 }}>
        <Button sx={{ mb: 2 }} variant="contained" onClick={isOpen ? handleClose : handleOpen}>
          サイドバー開閉
        </Button>
      </Box>
    </Box>
  );
};

/**
 * 基本的なサイドバー
 */
export const Default: Story = {
  name: '基本',
  args: {
    open: true,
    onClose: () => {},
    menuItems: [
      { type: 'item', text: '投稿一覧', icon: <Article />, href: '/articles' },
      { type: 'item', text: '設定', icon: <Settings />, href: '/settings' },
    ],
  },
  render: (arg) => <SampleRender {...arg} />,
};

/**
 * 階層構造メニューの例
 */
export const WithSubmenu: Story = {
  name: '階層構造',
  args: {
    open: true,
    onClose: () => {},
    menuItems: [
      { type: 'item', text: '投稿一覧', icon: <Article />, href: '/articles' },
      {
        type: 'submenu',
        key: 'settings',
        text: '設定',
        icon: <Settings />,
        children: [
          { type: 'item', text: 'プロフィール', icon: <Article />, href: '/settings/profile' },
          { type: 'item', text: 'アカウント', icon: <Settings />, href: '/settings/account' },
        ],
      },
    ],
  },
  render: (arg) => <SampleRender {...arg} />,
};

/**
 * 下部固定メニュー付き
 */
export const WithBottomMenu: Story = {
  name: '下部固定メニュー',
  args: {
    open: true,
    onClose: () => {},
    menuItems: [
      { type: 'item', text: '投稿一覧', icon: <Article />, href: '/articles' },
      { type: 'item', text: '設定', icon: <Settings />, href: '/settings' },
    ],
    bottomMenuItems: [
      { type: 'divider' },
      { type: 'item', text: '設定2', icon: <Settings />, href: '/settings2' },
      { type: 'item', text: 'ログアウト', icon: <Settings />, href: '/logout' },
    ],
  },
  render: (arg) => <SampleRender {...arg} />,
};
/**
 * スマホ表示
 */
export const SpView: Story = {
  name: 'スマホ表示',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    open: true,
    onClose: () => {},
    menuItems: [
      { type: 'item', text: '投稿一覧', icon: <Article />, href: '/articles' },
      { type: 'item', text: '設定', icon: <Settings />, href: '/settings' },
    ],
  },
  render: (arg) => <SampleRender {...arg} />,
};
