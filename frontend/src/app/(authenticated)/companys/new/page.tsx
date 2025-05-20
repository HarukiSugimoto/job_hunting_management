import { Box, Button, Card } from '@mui/material';
import { useCompanyCreateForm } from '@/hooks/domain/(authenticated)/company/useCompanyCreate';
import { SLFormContainer } from '@/sakura-like-ui/components/mui/form/SLFormContainer';
import { SLFormTextfield } from '@/sakura-like-ui/components/mui/form/SLFormTextfield';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';

export const CompanyNewPage: React.FC = () => {
  const { companyCreateForm, submitForm } = useCompanyCreateForm();
  return (
    <SLPageContainer title="Companyの新規作成">
      <Card sx={{ p: 2, mt: 3 }} variant="outlined">
        <SLFormContainer label="会社名" showRequired={true}>
          <SLFormTextfield
            control={companyCreateForm.control}
            name="name"
            placeholder="会社名を入力してください"
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
