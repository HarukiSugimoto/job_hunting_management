// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/SLSignInFormCard)

'use client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  InputAdornment,
  IconButton,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import type React from 'react';
import type { KeyboardEvent } from 'react';
import { type Control, Controller, type FieldErrors } from 'react-hook-form';

interface SignInFormValues {
  email: string;
  password: string;
}

export interface SLSignInFormCardProps {
  /**
   * ライトモードで使用するロゴのURL
   * darkMode用のロゴが指定されていない場合は、こちらが両方で使われる。
   */
  logoSrcLight?: string; // ライトモード用ロゴ
  /**
   * ダークモードで使用するロゴのURL
   */
  logoSrcDark?: string; // ダークモード用ロゴ
  /**
   * サービス名
   */
  title: string;
  /**
   * 送信中の状態
   */
  isSubmitting: boolean;
  /**
   * React Hook Formのエラーオブジェクト
   * @see https://react-hook-form.com/api/useform/formstate
   */
  errors: FieldErrors<SignInFormValues>;
  /**
   * ログイン失敗時のエラーメッセージ
   */
  signInErrorMessage: string | null;
  /**
   * react-hook-formのコントロールオブジェクト
   */
  control: Control<SignInFormValues>;
  /**
   * フォームの送信処理
   */
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  /**
   * パスワードを表示するかどうか
   */
  isShowPassword: boolean;
  /**
   * パスワードの表示/非表示を切り替える関数
   */
  toggleShowPassword: () => void;
}

/**
 * サインイン処理に利用するカード
 * emailとpasswordの入力欄をもったreact-hook-formのcontrolを渡して利用すること
 */
export const SLSignInFormCard = (props: SLSignInFormCardProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, fieldName: 'email' | 'password') => {
    if (e.key === 'Enter') {
      if (fieldName === 'email') {
        // メールアドレス欄でEnterを押したら、パスワード欄にフォーカス
        const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
        if (passwordInput) {
          e.preventDefault();
          passwordInput.focus();
        }
      }
      // パスワード欄でのEnterキーはデフォルトの動作（フォーム送信）を許可
    }
  };

  // ロゴ部分のレンダリング
  const renderLogo = () => {
    if (props.logoSrcLight || props.logoSrcDark) {
      // 画像ロゴの場合
      return (
        <>
          <Box
            alt={`${props.title}のロゴlight`}
            component="img"
            src={props.logoSrcLight}
            sx={{
              '.light &': {
                display: 'block',
              },
              '.dark &': {
                display: 'none',
              },
              maxHeight: 40,
            }}
          />
          <Box
            alt={`${props.title}のロゴdark`}
            component="img"
            src={props.logoSrcDark || props.logoSrcLight}
            sx={{
              '.light &': {
                display: 'none',
              },
              '.dark &': {
                display: 'block',
              },
              maxHeight: 40,
            }}
          />
        </>
      );
    } else if (props.title) {
      // テキストロゴの場合
      return (
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.5px',
            mb: 2,
            textAlign: 'center',
            color: 'primary.main',
          }}
          variant="h4"
        >
          {props.title}
        </Typography>
      );
    }
    // どちらも指定されていない場合は何も表示しない
    return null;
  };

  return (
    <Card sx={{ minWidth: 400, width: '100%' }} variant="outlined">
      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          {renderLogo()}
          <Typography color="text.secondary" component="h2" fontWeight="bold" variant="subtitle1">
            ログイン
          </Typography>
        </Box>

        <form noValidate onSubmit={props.handleSubmit}>
          <Box sx={{ mt: 3 }}>
            <Typography color="text.secondary" sx={{ mb: 1 }} variant="body2">
              メールアドレス
            </Typography>
            <Controller
              control={props.control}
              name="email"
              render={({ field }) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...field}
                  fullWidth
                  autoComplete="email"
                  disabled={props.isSubmitting}
                  error={!!props.errors.email}
                  helperText={props.errors.email?.message}
                  placeholder="example@email.com"
                  size="small"
                  type="email"
                  onKeyDown={(e) => handleKeyDown(e, 'email')}
                />
              )}
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography color="text.secondary" sx={{ mb: 1 }} variant="body2">
              パスワード
            </Typography>
            <Controller
              control={props.control}
              name="password"
              render={({ field }) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...field}
                  fullWidth
                  autoComplete="current-password"
                  disabled={props.isSubmitting}
                  error={!!props.errors.password}
                  helperText={props.errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="パスワードの表示切り替え"
                          edge="end"
                          onClick={props.toggleShowPassword}
                        >
                          {props.isShowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="••••••••"
                  size="small"
                  type={props.isShowPassword ? 'text' : 'password'}
                  onKeyDown={(e) => handleKeyDown(e, 'password')}
                />
              )}
            />
          </Box>

          <Typography
            color="text.secondary"
            sx={{ display: 'block', mt: 1, mb: 2 }}
            variant="caption"
          >
            半角英数字含む8文字以上
          </Typography>

          {props.signInErrorMessage && (
            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
              {props.signInErrorMessage}
            </Alert>
          )}

          <Button
            disableElevation
            fullWidth
            color="primary"
            disabled={props.isSubmitting}
            sx={{ mt: 2, py: 1.5 }}
            type="submit"
            variant="contained"
          >
            {props.isSubmitting ? <CircularProgress color="inherit" size={24} /> : 'ログイン'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
