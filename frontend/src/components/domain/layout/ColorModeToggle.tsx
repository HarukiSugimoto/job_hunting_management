import {
  DarkModeRounded as DarkModeIcon,
  LightModeRounded as LightModeIcon,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import React from 'react';

export const ColorModeToggle: React.FC = () => {
  const { mode, setMode } = useColorScheme();
  // system モードはブラウザ設定にフォールバック
  const effective: 'light' | 'dark' =
    mode === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : mode
        ? mode
        : 'light';

  const handleToggle = () => {
    setMode(effective === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton
      aria-label="Toggle light/dark mode"
      size="small"
      sx={{ color: 'inherit' }}
      onClick={handleToggle}
    >
      {effective === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};
