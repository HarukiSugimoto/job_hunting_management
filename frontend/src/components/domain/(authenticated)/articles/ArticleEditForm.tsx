import { Alert, Box, Button, Card } from '@mui/material';
import { useState } from 'react';
import { useArticleCreateForm } from '@/hooks/domain/(authenticated)/article/useArticleCreate';
import { useArticleUpdateForm } from '@/hooks/domain/(authenticated)/article/useArticleUpdate';
import { SLFormContainer } from '@/sakura-like-ui/components/mui/form/SLFormContainer';
import { SLFormTextfield } from '@/sakura-like-ui/components/mui/form/SLFormTextfield';

type ArticleEditFormProps =
  | {
      variant: 'update';
      form: ReturnType<typeof useArticleUpdateForm>['articleUpdateForm'];
      isInitialized: ReturnType<typeof useArticleUpdateForm>['isInitialized'];
      submitForm: ReturnType<typeof useArticleUpdateForm>['submitForm'];
    }
  | {
      variant: 'create';
      form: ReturnType<typeof useArticleCreateForm>['articleCreateForm'];
      submitForm: ReturnType<typeof useArticleCreateForm>['submitForm'];
    };

export const ArticleEditForm: React.FC<ArticleEditFormProps> = (props) => {
  const [isConfirmationMode, setIsConfirmationMode] = useState(false);

  const handleShowConfirmation = async () => {
    const isValid = await props.form.trigger();
    if (isValid) {
      setIsConfirmationMode(true);
    }
  };

  const handleBackToInputMode = () => {
    setIsConfirmationMode(false);
  };

  return (
    <Card sx={{ p: 2, mt: 3 }} variant="outlined">
      {isConfirmationMode && (
        <Alert icon={false} severity="success" sx={{ fontWeight: 'bold' }}>
          入力内容をご確認ください
        </Alert>
      )}

      <SLFormContainer label="タイトル" showRequired={true}>
        <SLFormTextfield
          control={props.form.control}
          disabled={
            (props.variant === 'update' && !props.isInitialized) ||
            props.form.formState.isSubmitting
          }
          isConfirmationMode={isConfirmationMode}
          name="title"
          placeholder="Please enter text"
        />
      </SLFormContainer>
      <SLFormContainer label="内容" showRequired={true}>
        <SLFormTextfield
          control={props.form.control}
          disabled={
            (props.variant === 'update' && !props.isInitialized) ||
            props.form.formState.isSubmitting
          }
          isConfirmationMode={isConfirmationMode}
          name="content"
          placeholder="Please enter text"
          widthType="full"
        />
      </SLFormContainer>

      <Box mt={2}>
        {isConfirmationMode ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="primary" variant="outlined" onClick={handleBackToInputMode}>
              戻る
            </Button>
            <Button
              color="primary"
              loading={props.form.formState.isSubmitting}
              variant="contained"
              onClick={props.submitForm}
            >
              送信
            </Button>
          </Box>
        ) : (
          <Button
            color="primary"
            loading={props.form.formState.isSubmitting}
            variant="contained"
            onClick={handleShowConfirmation}
          >
            確認画面へ
          </Button>
        )}
      </Box>
    </Card>
  );
};
