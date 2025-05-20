import { ArticleEditForm } from '@/components/domain/(authenticated)/articles/ArticleEditForm';
import { useArticleCreateForm } from '@/hooks/domain/(authenticated)/article/useArticleCreate';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';

export const ArticleNewWithConfirmPage: React.FC = () => {
  const { articleCreateForm, submitForm } = useArticleCreateForm();
  return (
    <SLPageContainer title="Articleの新規作成(確認画面付き)">
      <ArticleEditForm form={articleCreateForm} submitForm={submitForm} variant="create" />
    </SLPageContainer>
  );
};
