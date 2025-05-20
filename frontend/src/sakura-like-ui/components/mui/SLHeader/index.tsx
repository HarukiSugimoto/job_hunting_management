// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/SLHeader)

import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import type React from 'react';

interface SLHeaderProps {
  /**
   * サイドバーーの開閉ボタンのコールバック
   */
  onMenuToggle: () => void;
  /**
   * 左側のコンテンツ
   */
  leftContent?: React.ReactNode;
  /**
   * 右側のコンテンツ
   */
  rightContent?: React.ReactNode;
}

export const SLHeader: React.FC<SLHeaderProps> = (props) => (
  <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <IconButton
        aria-label="open drawer"
        color="inherit"
        edge="start"
        sx={{ mr: 2 }}
        onClick={props.onMenuToggle}
      >
        <MenuIcon />
      </IconButton>

      <Box>{props.leftContent}</Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box>{props.rightContent}</Box>
    </Toolbar>
  </AppBar>
);
