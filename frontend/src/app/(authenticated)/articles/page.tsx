import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArticleList } from '@/components/domain/(authenticated)/articles/ArticleList';
import { ArticleSearchForm } from '@/components/domain/(authenticated)/articles/ArticleSearchForm';
import { useArticleListData } from '@/hooks/domain/(authenticated)/article/articleListPageHooks';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';

export const ArticlesPage: FC = () => {
  const { results, isLoading, error } = useArticleListData();

  if (error) {
    throw new Error(error);
  }

  return (
    <SLPageContainer
      title="Articles"
      titleRightContent={
        <Button
          component={Link}
          startIcon={<AddCircleIcon />}
          to="/articles/new"
          variant="contained"
        >
          新規作成
        </Button>
      }
    >
      <ArticleSearchForm />

      <ArticleList
        data={results?.articles}
        isLoading={isLoading}
        totalCount={results?.page.total ?? 0}
      />
    </SLPageContainer>
  );
};
