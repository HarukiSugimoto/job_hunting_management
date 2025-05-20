// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/SLInfoItem)

import { Box, Divider, Skeleton } from '@mui/material';
import type { SkeletonProps } from '@mui/material';
import type { ReactNode } from 'react';

// 項目の型定義
export interface SLInfoItemProps {
  label: string;
  data: string | ReactNode;
  isLoading?: boolean;
  /**
   * Skeletonの種類、デフォルトは'text'
   */
  skeletonVariant?: SkeletonProps['variant'];
}

/**
 * データの詳細ページで各データの行を表示するコンポーネント
 */
export const SLInfoItem: React.FC<SLInfoItemProps> = (props) => {
  const variant = props.skeletonVariant || 'text';

  let skeletonSx = {};

  if (variant === 'rectangular') {
    skeletonSx = { height: 100, width: '80%' };
  } else if (variant === 'circular') {
    skeletonSx = { width: 40, height: 40 };
  } else {
    // 'text'やそれ以外はデフォルト
    skeletonSx = { width: '80%' };
  }

  return (
    <Box
      sx={{
        '&:last-child .item-divider': {
          display: 'none', // 最後の項目のDividerを非表示
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          py: 1.5,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '30%' },
            fontWeight: 'medium',
            color: 'text.secondary',
            mb: { xs: 1, sm: 0 },
          }}
        >
          {props.label}
        </Box>
        <Box
          sx={{
            width: { xs: '100%', sm: '70%' },
            color: 'text.primary',
          }}
        >
          {props.isLoading ? (
            <Skeleton animation="wave" sx={skeletonSx} variant={variant} />
          ) : (
            props.data
          )}
        </Box>
      </Box>
      <Divider className="item-divider" />
    </Box>
  );
};
