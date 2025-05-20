import { TextField, Typography, type TextFieldProps } from '@mui/material';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';

export type SLFormTextfieldProps<T extends FieldValues> = UseControllerProps<T> & {
  /**
   * プレースホルダー
   */
  placeholder?: TextFieldProps['placeholder'];
  /**
   * ラベル
   */
  label?: string;
  /**
   * テキストフィールドの無効化
   */
  disabled?: TextFieldProps['disabled'];
  /**
   * type属性
   */
  type?: TextFieldProps['type'];
  /**
   * name属性
   */
  name: TextFieldProps['name'];
  /**
   * 前後にアイコンなどを表示するためのプロップ
   * 詳細は https://mui.com/material-ui/api/text-field/ を参照
   */
  slotProps?: TextFieldProps['slotProps'];
  /**
   * テキストフィールドの幅
   * デフォルトは 'md'
   */
  widthType?: 'full' | 'sm' | 'md' | 'lg';
  /**
   * 確認画面モード
   */
  isConfirmationMode?: boolean;
};

/**
 * React Hook Form のコントローラーを使用したテキストフィールド
 */
// eslint-disable-next-line react/destructuring-assignment
export const SLFormTextfield = <T extends FieldValues>({
  widthType = 'lg', // デフォルト値を 'md' に設定
  ...props
}: SLFormTextfieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({
    name: props.name,
    control: props.control,
  });

  if (props.isConfirmationMode) {
    return (
      <Typography
        sx={(theme) => ({
          padding: theme.spacing(1),
          width: '100%',
          maxWidth:
            widthType === 'sm' ? 150 : widthType === 'md' ? 300 : widthType === 'lg' ? 500 : '100%',
          [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
          },
        })}
      >
        {field.value || '(未入力)'}
      </Typography>
    );
  }

  return (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}
      disabled={props.disabled}
      error={!!error}
      helperText={!!error && error?.message}
      label={props.label}
      placeholder={props.placeholder}
      size="small"
      slotProps={props.slotProps}
      sx={(theme) => ({
        width: '100%', // 親要素を超えないようにする
        maxWidth:
          widthType === 'sm' ? 150 : widthType === 'md' ? 300 : widthType === 'lg' ? 500 : '100%',
        [theme.breakpoints.down('sm')]: {
          maxWidth: '100%',
        },
      })}
      type={props.type || 'text'}
      variant="outlined"
    />
  );
};
