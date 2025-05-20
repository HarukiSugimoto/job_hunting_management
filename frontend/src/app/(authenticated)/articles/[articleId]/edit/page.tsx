import { useParams } from 'react-router-dom';
import { ArticleEditForm } from '@/components/domain/(authenticated)/articles/ArticleEditForm';
import { useArticleUpdateForm } from '@/hooks/domain/(authenticated)/article/useArticleUpdate';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';

export const ArticleEditPage: React.FC = () => {
  const { articleId } = useParams();
  const { isInitialized, articleUpdateForm, submitForm } = useArticleUpdateForm(Number(articleId));
  return (
    <SLPageContainer title="Articleの編集(確認画面付き)">
      <ArticleEditForm
        form={articleUpdateForm}
        isInitialized={isInitialized}
        submitForm={submitForm}
        variant="update"
      />
    </SLPageContainer>
  );
};
