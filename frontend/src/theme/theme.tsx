/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      appBarBg: string;
    };
  }
  interface ThemeOptions {
    customColors?: {
      appBarBg: string;
    };
  }
}

/**
 * メインのアプリケーションのテーマカラー
 * primaryなどの色は変えずに専用カラーとして定義しておく
 */
const APP_BAR_BG_COLOR = '#166987' as const;
/**
 * 画面全体の背景色
 */
const BODY_BG_COLOR = {
  light: '#f5f5f5',
  dark: '#121212',
} as const;
/**
 * 画面全体の背景色に対してPaperやCardの背景色
 */
const PAPER_BG_COLOR = {
  light: '#ffffff',
  dark: '#2a2a2a',
} as const;

const PRIMARY_CONTRAST_TEXT_COLOR = 'var(--mui-palette-primary-contrastText);' as const;

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  // ライト／ダーク両方のカラースキームをまとめて定義
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        background: {
          default: BODY_BG_COLOR.light,
          paper: PAPER_BG_COLOR.light,
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        background: {
          default: BODY_BG_COLOR.dark,
          paper: PAPER_BG_COLOR.dark,
        },
        AppBar: {
          darkBg: APP_BAR_BG_COLOR,
          darkColor: PRIMARY_CONTRAST_TEXT_COLOR,
        },
      },
    },
  },
  customColors: {
    appBarBg: APP_BAR_BG_COLOR,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: 'none' } },
    },
    MuiCard: { defaultProps: { elevation: 0 } },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme: t }) => ({
          backgroundColor: t.customColors.appBarBg,
        }),
      },
    },
    MuiPaper: { defaultProps: { elevation: 0 } },
  },
  typography: {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontSize: 14,
    h1: { fontSize: '2rem', fontWeight: 700, lineHeight: 2 },
    h2: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.75 },
    h3: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.5 },
    h4: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.25 },
    h5: { fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.1 },
    h6: { fontSize: '1rem', fontWeight: 700, lineHeight: 1 },
  },
});
