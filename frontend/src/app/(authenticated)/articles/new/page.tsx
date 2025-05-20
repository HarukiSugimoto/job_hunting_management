import { Box, Button, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import { useArticleCreateForm } from '@/hooks/domain/(authenticated)/article/useArticleCreate';
import { SLFormContainer } from '@/sakura-like-ui/components/mui/form/SLFormContainer';
import { SLFormTextfield } from '@/sakura-like-ui/components/mui/form/SLFormTextfield';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';

export const ArticleNewPage: React.FC = () => {
  const { articleCreateForm, submitForm } = useArticleCreateForm();
  return (
    <SLPageContainer title="Articleの新規作成">
      <Card sx={{ p: 2, mt: 3 }} variant="outlined">
        <SLFormContainer label="タイトル" showRequired={true}>
          <SLFormTextfield
            control={articleCreateForm.control}
            name="title"
            placeholder="Please enter text"
          />
        </SLFormContainer>
        <SLFormContainer label="内容" showRequired={true}>
          <SLFormTextfield
            control={articleCreateForm.control}
            name="content"
            placeholder="Please enter text"
            widthType="full"
          />
        </SLFormContainer>

        <Box mt={2}>
          <Button
            color="primary"
            loading={articleCreateForm.formState.isSubmitting}
            variant="contained"
            onClick={submitForm}
          >
            送信
          </Button>
        </Box>
      </Card>
      <Box mt={2}>
        <Link to="/articles/new-with-confirm">確認画面付きのVer</Link>
      </Box>
    </SLPageContainer>
  );
};
