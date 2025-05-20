import { Search as SearchIcon } from '@mui/icons-material';
import { Button, Card, Grid } from '@mui/material';
import type React from 'react';

import { useArticleSearchForm } from '@/hooks/domain/(authenticated)/article/articleListPageHooks';
import { SLFormTextfield } from '@/sakura-like-ui/components/mui/form/SLFormTextfield';

export const ArticleSearchForm: React.FC = () => {
  const { searchForm, submitForm } = useArticleSearchForm();

  return (
    <Card sx={{ p: 2, mb: 3 }} variant="outlined">
      <form onSubmit={submitForm}>
        <Grid container alignItems="stretch" spacing={2}>
          <Grid size={{ sm: 6, xs: 12 }}>
            <SLFormTextfield
              control={searchForm.control}
              label="キーワード"
              name="word"
              widthType="full"
            />
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            <SLFormTextfield
              control={searchForm.control}
              label="サンプル"
              name="word"
              widthType="full"
            />
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            <SLFormTextfield
              control={searchForm.control}
              label="サンプル2"
              name="word"
              widthType="full"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
          <Grid size={{ sm: 4, xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              fullWidth
              loading={searchForm.formState.isSubmitting}
              startIcon={<SearchIcon />}
              type="submit"
              variant="contained"
            >
              検索
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};
