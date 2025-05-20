import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Avatar, ListSubheader } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSessionContext } from '@/contexts/sessionContext';
import { useLogout } from '@/hooks/domain/(authenticated)/useLogout';

export const HeaderMenuButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { session } = useSessionContext();
  const { sessionLogout } = useLogout();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    sessionLogout();
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-controls="menu-appbar"
        aria-haspopup="true"
        aria-label="account of current user"
        color="inherit"
        size="large"
        onClick={handleMenu}
      >
        <Avatar>
          <AccountCircle />
        </Avatar>
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        id="menu-appbar"
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ListSubheader>{session.data?.loginUser.name}</ListSubheader>
        <MenuItem component={Link} to="/profile">
          プロフィール設定
        </MenuItem>
        <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
      </Menu>
    </>
  );
};
