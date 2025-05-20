// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/SLDialogFrame)

// MUI
import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Button,
} from '@mui/material';
import * as React from 'react';

interface SLDialogFrameProps {
  /**
   * ダイアログの開閉状態
   */
  isOpen: boolean;
  /**
   * ダイアログのタイトル
   */
  title: string;
  /**
   * ダイアログを閉じる関数
   */
  handleClose: () => void;
  /**
   * ダイアログのメインコンテンツ
   */
  children: React.ReactNode;
  /**
   * 各ダイアログ要素のラベル要素に付与するプレフィックス
   */
  labelPrefix: string;
  /**
   * ダイアログ下部の左ボタンテキスト、デフォルトは"キャンセル"
   */
  negativeButtonText?: string;
  /**
   * ダイアログ下部の左ボタンアクション
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  negativeButtonAction?: (...args: any[]) => void | Promise<void>;
  /**
   * ダイアログ下部の右ボタンテキスト、デフォルトは"OK"
   */
  positiveButtonText?: string;
  /**
   * ダイアログ下部の右ボタンアクション
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  positiveButtonAction?: (...args: any[]) => void | Promise<void>;
  /**
   * ボタンのdisable
   */
  disable?: boolean;
  /**
   * ロード状態
   */
  isLoading?: boolean;
  /**
   * モーダルの幅
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * className
   */
  className?: string;
}

export const SLDialogFrame: React.FC<SLDialogFrameProps> = (props: SLDialogFrameProps) => (
  <Dialog
    fullWidth
    aria-describedby={`${props.labelPrefix}-dialog-description`}
    aria-labelledby={`${props.labelPrefix}-dialog-title`}
    maxWidth={props.maxWidth ? props.maxWidth : 'lg'}
    open={props.isOpen}
    onClose={props.handleClose}
  >
    <DialogTitle
      id={`${props.labelPrefix}-dialog-title`}
      sx={{
        textAlign: 'center',
        fontWeight: 700,
      }}
    >
      {props.title}
    </DialogTitle>
    <DialogContent
      dividers
      sx={{
        p: 0,
        mx: 3,
        pb: 3,
      }}
    >
      {props.children}
    </DialogContent>

    <DialogActions
      sx={{
        px: 3,
        pt: 2,
        pb: 4,
        justifyContent:
          props.negativeButtonAction && props.positiveButtonAction ? 'space-between' : 'flex-end',
      }}
    >
      {!!props.negativeButtonAction && (
        <Button
          color="inherit"
          disabled={props.disable}
          variant="outlined"
          onClick={props.negativeButtonAction}
        >
          {props.negativeButtonText || 'キャンセル'}
        </Button>
      )}
      {!!props.positiveButtonAction && (
        <Button
          disabled={props.disable || props.isLoading}
          variant="contained"
          onClick={props.positiveButtonAction}
        >
          {!props.isLoading && (props.positiveButtonText || 'OK')}
          {props.isLoading && <CircularProgress color="inherit" size="20px" />}
        </Button>
      )}
    </DialogActions>
    <IconButton
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
      }}
      onClick={props.handleClose}
    >
      <Close />
    </IconButton>
  </Dialog>
);
