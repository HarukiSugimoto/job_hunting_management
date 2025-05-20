import { EmailOutlined } from '@mui/icons-material';
import { Button, InputAdornment, Box } from '@mui/material';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNotFound } from '@/hooks/common/useNotFound';
import { SLFormCheckbox } from '@/sakura-like-ui/components/mui/form/SLFormCheckbox';
import { SLFormCheckboxGroup } from '@/sakura-like-ui/components/mui/form/SLFormCheckboxGroup';
import { SLFormContainer } from '@/sakura-like-ui/components/mui/form/SLFormContainer';
import { SLFormMultiSelect } from '@/sakura-like-ui/components/mui/form/SLFormMultiSelect';
import { SLFormSelect } from '@/sakura-like-ui/components/mui/form/SLFormSelect';
import { SLFormTextfield } from '@/sakura-like-ui/components/mui/form/SLFormTextfield';
import { SLDialogFrame } from '@/sakura-like-ui/components/mui/SLDialogFrame';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';
import { useCustomConfirm } from '@/sakura-like-ui/hooks/CustomConfirm';

const options = [
  {
    value: '1',
    label: 'value 1',
  },
  {
    value: '2',
    label: 'value 2',
  },
  {
    value: '3',
    label: 'value 3',
  },
  {
    value: '4',
    label: 'value 4',
  },
];

const multiSelectOptions = [
  {
    value: 8,
    label: '茨城県',
  },
  {
    value: 9,
    label: '栃木県',
  },
  {
    value: 10,
    label: '群馬県',
  },
  {
    value: 11,
    label: '埼玉県',
  },
  {
    value: 12,
    label: '千葉県',
  },
  {
    value: 13,
    label: '東京都',
  },
  {
    value: 14,
    label: '神奈川県',
  },
];

export const DashboardPage: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const notifications = useNotifications();
  const { customConfirm } = useCustomConfirm();
  const { notFound } = useNotFound();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const sampleCustomConfirm = async () => {
    if (
      await customConfirm({
        title: 'Sample Confirm',
        description: 'This is a sample confirm dialog.',
      })
    ) {
      window.alert('OK');
    } else {
      window.alert('Cancel');
    }
  };

  const submit = handleSubmit(async (data) => {
    console.log(data);
  });

  const sampleNotFound = async () => {
    notFound();
  };

  const sampleNotification = () => {
    notifications.show('通知を表示できます', {
      severity: 'info',
      autoHideDuration: 3000,
    });
  };

  return (
    <SLPageContainer title="Dashboard">
      <h2>Custom Confirm</h2>
      <p>Window.confirm のように確認ダイアログを表示するhookのサンプル</p>
      <Button color="primary" variant="contained" onClick={sampleCustomConfirm}>
        Confirm
      </Button>
      <h2>Show Not Found</h2>
      <p>NextjsのNotFound()のようにNotFoundページをレンダリングするhookのサンプル</p>
      <Button color="primary" variant="contained" onClick={sampleNotFound}>
        notFound
      </Button>
      <h2>通知表示</h2>
      <p>MUIのAlertを任意のタイミングで表示する</p>
      <Button color="primary" variant="contained" onClick={sampleNotification}>
        show notification
      </Button>
      <h2>汎用的なダイアログ</h2>
      <p>中身を自由に配置できるダイアログのサンプル</p>
      <Button color="primary" variant="contained" onClick={() => setIsDialogOpen(true)}>
        show dialog
      </Button>
      <SLDialogFrame
        handleClose={() => setIsDialogOpen(false)}
        isOpen={isDialogOpen}
        labelPrefix="sample-dialog"
        maxWidth="sm"
        negativeButtonAction={() => setIsDialogOpen(false)}
        negativeButtonText="キャンセル"
        positiveButtonAction={() => {
          submit();
          setIsDialogOpen(false);
        }}
        positiveButtonText="保存"
        title="サンプル"
      >
        <p>ダイアログの内容</p>
        <p>自由に要素を配置できます</p>
        <SLFormContainer label="テキストフィールド">
          <SLFormTextfield
            control={control}
            name="dialog-text"
            placeholder="Please enter text"
            widthType="full"
          />
        </SLFormContainer>
      </SLDialogFrame>
      <h2>Form template</h2>
      <SLFormContainer label="Required" showRequired={true}>
        <SLFormTextfield control={control} name="required-text" placeholder="Please enter text" />
      </SLFormContainer>
      <SLFormContainer label="width-full">
        <SLFormTextfield
          control={control}
          name="width-full"
          placeholder="Please enter text"
          widthType="full"
        />
      </SLFormContainer>
      <SLFormContainer label="width-sm">
        <SLFormTextfield
          control={control}
          name="width-sm"
          placeholder="Please enter text"
          widthType="sm"
        />
      </SLFormContainer>
      <SLFormContainer label="width-md">
        <SLFormTextfield
          control={control}
          name="width-md"
          placeholder="Please enter text"
          widthType="md"
        />
      </SLFormContainer>
      <SLFormContainer label="width-lg">
        <SLFormTextfield
          control={control}
          name="width-lg"
          placeholder="Please enter text"
          widthType="lg"
        />
      </SLFormContainer>
      <SLFormContainer label="With Icon" showRequired={true}>
        <SLFormTextfield
          control={control}
          name="input"
          placeholder="メールアドレス"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),
            },
          }}
        />
      </SLFormContainer>

      <SLFormContainer label="Form select label">
        <SLFormSelect
          showNonValueOption
          control={control}
          defaultValue=""
          name="select"
          options={options}
          widthType="sm"
        />
      </SLFormContainer>

      <SLFormContainer label="Form select label">
        <SLFormMultiSelect control={control} name="multi-select" options={multiSelectOptions} />
      </SLFormContainer>

      <SLFormContainer label="チェックボックスグループ">
        <SLFormCheckboxGroup
          control={control}
          defaultValue=""
          name="checkbox-group"
          options={options}
        />
      </SLFormContainer>
      <SLFormCheckbox
        value
        control={control}
        name="agreement"
        valueLabel="上記、個人情報保護方針等および利用約款に同意いたします。"
      />
      <Box mt={2}>
        <Button color="primary" variant="contained" onClick={submit}>
          送信
        </Button>
      </Box>
    </SLPageContainer>
  );
};
