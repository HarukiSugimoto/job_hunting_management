import { Box, Button, Card } from '@mui/material';
import { SLFormContainer } from '@/sakura-like-ui/components/mui/form/SLFormContainer';
import { SLFormTextfield } from '@/sakura-like-ui/components/mui/form/SLFormTextfield';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';
import { useParams } from 'react-router-dom';
import { useMyPageUpdateForm } from '@/hooks/domain/(authenticated)/mypage/useMyPageUpdate';
import { SLFormSelect } from '@/sakura-like-ui/components/mui/form/SLFormSelect';
import { useMyPageCreateMasterData } from '@/hooks/domain/(authenticated)/mypage/useMyPageCreateMasterData';

export const MyPageEditPage: React.FC = () => {
  const { mypageId } = useParams();
  const { results } = useMyPageCreateMasterData();
  const { mypageUpdateForm, submitForm } = useMyPageUpdateForm(Number(mypageId));
  const companyOptions = [
    { label: '選択してください', value: -1 }, // ← 追加
    ...results?.companies.map(c => ({ label: c.name, value: c.id })) || [],
  ];
  const priorityOptions = [
    { label: '選択してください', value: -1 }, // ← 追加
    ...results?.priorities || [],
  ];
  return (
    <SLPageContainer title="MyPageの更新">
          <Card sx={{ p: 2, mt: 3 }} variant="outlined">
            <SLFormContainer label="会社名" showRequired={true}>
              <SLFormSelect
                control={mypageUpdateForm.control}
                name="company_id"
                options={companyOptions}
              />
            </SLFormContainer>
            <SLFormContainer label="職種" showRequired={true}>
              <SLFormTextfield
                control={mypageUpdateForm.control}
                name="type"
                placeholder="職種を入力してください"
              />
            </SLFormContainer>
            <SLFormContainer label="優先度" showRequired={true}>
              <SLFormSelect
                control={mypageUpdateForm.control}
                name="priority"
                options={priorityOptions}
              />
            </SLFormContainer>
            <SLFormContainer label="ログインID" showRequired={true}>
              <SLFormTextfield
                control={mypageUpdateForm.control}
                name="login_id"
                placeholder="ログインIDを入力してください"
              />
            </SLFormContainer>
            <SLFormContainer label="URL" showRequired={true}>
              <SLFormTextfield
                control={mypageUpdateForm.control}
                name="link"
                placeholder="URLを入力してください"
              />
            </SLFormContainer>
            <Box mt={2} display="flex" justifyContent="center" >
              <Button
                color="primary"
                loading={mypageUpdateForm.formState.isSubmitting}
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
