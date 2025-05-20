// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/SLPageContainer)

// pageTitleを追加してる

import { Box, Container, Typography } from '@mui/material';
import { PageTitle } from '@/components/common/PageTitle';

interface SLPageContainerProps {
  /**
   * ページのタイトル
   * (省略可)
   */
  title?: string;
  /**
   * ページのコンテンツ
   */
  children: React.ReactNode;
  /**
   * タイトルの右側に表示するコンテンツ
   */
  titleRightContent?: React.ReactNode;
}

/**
 * ページのコンテンツをラップするコンテナコンポーネント
 */
export const SLPageContainer: React.FC<SLPageContainerProps> = (props) => (
  <Container sx={{ display: 'flex', flexDirection: 'column', py: 2 }}>
    <PageTitle title={props.title || ''} />
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 1, sm: 0 },
      }}
    >
      {!!props.title && (
        <Typography component="h1" variant="h1">
          {props.title}
        </Typography>
      )}
      {!!props.titleRightContent && (
        <Box sx={{ display: 'flex', justifyContent: 'end', width: { xs: '100%', sm: 'auto' } }}>
          {props.titleRightContent}
        </Box>
      )}
    </Box>
    <Box>{props.children}</Box>
  </Container>
);
