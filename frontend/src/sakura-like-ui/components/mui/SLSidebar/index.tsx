// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/SLSidebar)

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LinkMenuItem {
  type: 'item';
  text: string;
  icon: React.ReactNode;
  href: string;
  key?: string;
}

interface DividerMenuItem {
  type: 'divider';
  key?: string;
}

interface SubmenuItem {
  type: 'submenu';
  text: string;
  icon: React.ReactNode;
  children: MenuEntry[];
  key: string;
}

type MenuEntry = LinkMenuItem | DividerMenuItem | SubmenuItem;

export interface SLSidebarProps {
  open: boolean;
  onClose: () => void;
  menuItems: MenuEntry[];
  bottomMenuItems?: MenuEntry[];
  drawerWidth?: number;
}

export const SLSidebar: React.FC<SLSidebarProps> = (props) => {
  const theme = useTheme();
  const isTemporaryMode = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const drawerWidth = props.drawerWidth ?? 240;

  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const isActivePath = (href: string): boolean =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  const isExactPath = (href: string): boolean => location.pathname === href;

  useEffect(() => {
    const expanded: Record<string, boolean> = {};
    props.menuItems.forEach((item) => {
      if (item.type === 'submenu') {
        const shouldOpen = item.children.some(
          (child) => child.type === 'item' && isActivePath(child.href)
        );
        if (shouldOpen) {
          expanded[item.key] = true;
        }
      }
    });
    setOpenMap(expanded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, props.menuItems]);

  const handleToggle = (key: string) => {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems = props.menuItems;
  const bottomMenuItems = props.bottomMenuItems ?? [];

  const renderEntry = (item: MenuEntry, index: number): React.ReactNode => {
    if (item.type === 'divider') {
      return <Divider key={item.key ?? `divider-${index}`} />;
    }

    if (item.type === 'item') {
      const isSelected = isActivePath(item.href);
      const isExact = isExactPath(item.href);
      return (
        <ListItemButton
          key={item.key ?? item.text}
          aria-current={isExact ? 'page' : undefined}
          component={Link}
          selected={isSelected}
          to={item.href}
          onClick={isTemporaryMode ? props.onClose : undefined}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      );
    }

    const isOpen = openMap[item.key];
    return (
      <React.Fragment key={item.key}>
        <ListItemButton
          aria-controls={`${item.key}-submenu`}
          aria-expanded={isOpen}
          onClick={() => handleToggle(item.key)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse unmountOnExit id={`${item.key}-submenu`} in={isOpen} timeout="auto">
          <List disablePadding component="div">
            {item.children.map((child, i) => (
              <Box key={child.type === 'item' ? child.text : `child-${i}`} sx={{ pl: 4 }}>
                {renderEntry(child, i)}
              </Box>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  const drawerContent = (
    <>
      <Box aria-label="メインメニュー" component="nav" sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <List>{menuItems.map((item, i) => renderEntry(item, i))}</List>
      </Box>

      {bottomMenuItems.length > 0 && (
        <Box aria-label="下部メニュー" component="nav">
          <List>{bottomMenuItems.map((item, i) => renderEntry(item, i))}</List>
        </Box>
      )}
    </>
  );

  if (isTemporaryMode) {
    return (
      <Drawer
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        open={props.open}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        variant="temporary"
        onClose={props.onClose}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      open={props.open}
      sx={{
        width: props.open ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'fixed',
          height: '100%',
        },
      }}
      variant="persistent"
    >
      <Toolbar />
      {drawerContent}
    </Drawer>
  );
};
