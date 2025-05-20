import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { createContext, useState, ReactNode } from 'react';

interface ConfirmOptions {
  /**
   * ダイアログのタイトル
   */
  title: string;
  /**
   * ダイアログの説明
   */
  description: string | React.ReactNode;
  /**
   * ダイアログのOKボタンのラベル
   * @default 'OK'
   */
  positiveButtonLabel?: string;
  /**
   * ダイアログのキャンセルボタンのラベル
   * @default 'キャンセル'
   */
  negativeButtonLabel?: string;
  /**
   * ダイアログのキャンセルボタンを非表示にするかどうか
   * @default false
   */
  hideNegativeButton?: boolean;
}

interface CustomConfirmContextType {
  customConfirm: (options: ConfirmOptions) => Promise<boolean>;
}

export const customConfirmContext = createContext<CustomConfirmContextType | undefined>(undefined);

/**
 * 確認ダイアログを提供するコンテキストプロバイダ
 */
export const CustomConfirmProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolveFunc, setResolveFunc] = useState<((value: boolean) => void) | null>(null);

  /**
   * ダイアログを開く関数 (Promise で結果を返す)
   */
  const customConfirm = (opts: ConfirmOptions): Promise<boolean> =>
    new Promise((resolve) => {
      setOptions({
        positiveButtonLabel: 'OK',
        negativeButtonLabel: 'キャンセル',
        ...opts,
      });
      setResolveFunc(() => resolve);
      setIsOpen(true);
    });

  /**
   * ダイアログを閉じる処理
   */
  const handleClose = (result: boolean) => {
    (document.activeElement as HTMLElement)?.blur();
    if (resolveFunc) {
      resolveFunc(result); // 常に resolve で true/false を返す
    }
    setIsOpen(false);
    setOptions(null);
    setResolveFunc(null);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <customConfirmContext.Provider value={{ customConfirm }}>
      {props.children}
      {isOpen && (
        <Dialog open={isOpen}>
          {options && (
            <>
              <DialogTitle>{options.title}</DialogTitle>
              <DialogContent>{options.description}</DialogContent>

              <DialogActions>
                {!options.hideNegativeButton && (
                  <Button color="inherit" onClick={() => handleClose(false)}>
                    {options.negativeButtonLabel}
                  </Button>
                )}

                <Button color="primary" variant="contained" onClick={() => handleClose(true)}>
                  {options.positiveButtonLabel}
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      )}
    </customConfirmContext.Provider>
  );
};
