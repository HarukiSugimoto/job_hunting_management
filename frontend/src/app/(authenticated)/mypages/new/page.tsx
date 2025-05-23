import { Box, Button, Card } from '@mui/material';
import { SLFormContainer } from '@/sakura-like-ui/components/mui/form/SLFormContainer';
import { SLFormTextfield } from '@/sakura-like-ui/components/mui/form/SLFormTextfield';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';
import { SLFormSelect } from '@/sakura-like-ui/components/mui/form/SLFormSelect';
import { useMyPageCreateForm } from '@/hooks/domain/(authenticated)/mypage/useMyPageCreate';

export const MyPageNewPage: React.FC = () => {
  const { mypageCreateForm, submitForm } = useMyPageCreateForm();
  return (
    <SLPageContainer title="MyPageの新規作成">
      <Card sx={{ p: 2, mt: 3 }} variant="outlined">
        <SLFormContainer label="会社名" showRequired={true}>
          <SLFormSelect
            control={mypageCreateForm.control}
            name="company_id"
          />
        </SLFormContainer>
        <SLFormContainer label="職種" showRequired={true}>
          <SLFormTextfield
            control={mypageCreateForm.control}
            name="type"
            placeholder="職種を入力してください"
          />
        </SLFormContainer>
        <SLFormContainer label="優先度" showRequired={true}>
          <SLFormSelect
            control={mypageCreateForm.control}
            name="priority"
          />
        </SLFormContainer>
        <SLFormContainer label="ログインID" showRequired={true}>
          <SLFormTextfield
            control={mypageCreateForm.control}
            name="login_id"
            placeholder="ログインIDを入力してください"
          />
        </SLFormContainer>
        <SLFormContainer label="URL" showRequired={true}>
          <SLFormTextfield
            control={mypageCreateForm.control}
            name="link"
            placeholder="URLを入力してください"
          />
        </SLFormContainer>
        <Box mt={2} display="flex" justifyContent="center" >
          <Button
            color="primary"
            loading={companyCreateForm.formState.isSubmitting}
            variant="contained"
            onClick={submitForm}
          >
            送信
          </Button>
        </Box>
      </Card>
    </SLPageContainer>
  );
};
