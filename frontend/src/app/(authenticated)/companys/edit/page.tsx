import { Box, Button, Card } from '@mui/material';
import { SLFormContainer } from '@/sakura-like-ui/components/mui/form/SLFormContainer';
import { SLFormTextfield } from '@/sakura-like-ui/components/mui/form/SLFormTextfield';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';
import { useParams } from 'react-router-dom';
import { useCompanyUpdateForm } from '@/hooks/domain/(authenticated)/company/useCompanyUpdate';

export const CompanyEditPage: React.FC = () => {
  const { companyId } = useParams();
  const { companyUpdateForm, submitForm } = useCompanyUpdateForm(Number(companyId));
  return (
    <SLPageContainer title="Companyの更新">
      <Card sx={{ p: 2, mt: 3 }} variant="outlined">
        <SLFormContainer label="会社名" showRequired={true}>
          <SLFormTextfield
            control={companyUpdateForm.control}
            name="name"
            placeholder="会社名を入力してください"
          />
        </SLFormContainer>
        <Box mt={2} display="flex" justifyContent="center" >
          <Button
            color="primary"
            loading={companyUpdateForm.formState.isSubmitting}
            variant="contained"
            onClick={submitForm}
          >
            更新
          </Button>
        </Box>
      </Card>
    </SLPageContainer>
  );
};
