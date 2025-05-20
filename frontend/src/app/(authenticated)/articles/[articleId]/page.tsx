import { Edit as EditIcon } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useGetArticle } from '@/hooks/domain/(authenticated)/article/useGetArticle';
import { formatDate } from '@/lib/formatter';
import { SLInfoItem } from '@/sakura-like-ui/components/mui/SLInfoItem';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';

export const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{
    articleId: string;
  }>();

  const parsedArticleId = Number(articleId);
  if (!articleId || isNaN(parsedArticleId)) {
    throw new Error('articleId must be a number');
  }

  const { article } = useGetArticle({ path: { article: parsedArticleId } });

  return (
    <SLPageContainer
      title={`${article ? `${article.title} - ` : ''}Article詳細`}
      titleRightContent={
        <Button
          component={Link}
          startIcon={<EditIcon />}
          to={`/articles/${articleId}/edit`}
          variant="contained"
        >
          編集
        </Button>
      }
    >
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom component="h1" sx={{ fontWeight: 'bold', mb: 3 }} variant="h5">
            Articleデータ
          </Typography>
          <SLInfoItem data={article?.id} isLoading={!article} label="ID" />
          <SLInfoItem data={article?.title} isLoading={!article} label="タイトル" />
          <SLInfoItem data={article?.content} isLoading={!article} label="コンテンツ" />
          <SLInfoItem
            data={
              <Box
                alt="サムネイル"
                component="img"
                src="https://picsum.photos/100"
                sx={{
                  width: '100px',
                  height: 'auto',
                  borderRadius: 1,
                }}
              />
            }
            isLoading={!article}
            label="サムネイル"
            skeletonVariant="rectangular"
          />
          <SLInfoItem
            data={article?.createdAt && formatDate(article.createdAt)}
            isLoading={!article}
            label="作成日"
          />
          <SLInfoItem
            data={article?.updatedAt && formatDate(article.updatedAt)}
            isLoading={!article}
            label="更新日"
          />
        </CardContent>
      </Card>
    </SLPageContainer>
  );
};
