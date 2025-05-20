import { Box, LinearProgress } from '@mui/material';
import React from 'react';

export interface LinearContainerProps {
  /**
   * ローディング中かどうか
   */
  isLoading: boolean;
  /**
   * ローディングで隠す要素
   */
  children: React.ReactNode;
  /**
   * エラーかどうか
   */
  isError?: boolean;
  /**
   * エラー時のテキスト
   */
  errorText?: string;
  className?: string;
}

/**
 * Loading中に要素の上にLinearエフェクトを表示するwrapper要素
 * 応答を早めるため、ローディング中でも中身はレンダリングしていることに注意
 */
export const LinearContainer: React.FC<LinearContainerProps> = (props) => {
  if (props.isError) {
    throw new Error(props.errorText);
  }
  return (
    <>
      {props.isLoading && !props.isError && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {!props.isError && (
        <Box
          sx={{
            visibility: props.isLoading ? 'hidden' : 'visible',
            maxHeight: props.isLoading ? '100svh' : 'unset',
          }}
        >
          {props.children}
        </Box>
      )}
    </>
  );
};
