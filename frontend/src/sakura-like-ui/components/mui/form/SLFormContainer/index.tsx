// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/form/SLFormContainer)

import { Box, Chip, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import React from 'react';

export interface SLFormContainerProps {
  label?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  showRequired?: boolean;
}

/**
 * 各種入力要素を表示する際にラベルや必須マークを表示するコンテナ
 */
export const SLFormContainer: React.FC<SLFormContainerProps> = (props) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      ...props.sx,
    }}
  >
    {(props.label !== undefined || props.label === '') && (
      <Box
        sx={{
          py: 1,
          pr: 3,
          minHeight: 42,
        }}
      >
        <Box>
          <Typography
            component="span"
            sx={{
              fontWeight: 'bold',
              letterSpacing: 'initial',
              color: 'text.secondary',
            }}
          >
            {props.label}
          </Typography>

          {props.showRequired && props.label && (
            <Chip
              color="error"
              label="必須"
              size="small"
              sx={{ ml: 1, mt: 0, display: 'inline-flex' }}
              variant="outlined"
            />
          )}
        </Box>
      </Box>
    )}
    <Box>{props.children}</Box>
  </Box>
);
