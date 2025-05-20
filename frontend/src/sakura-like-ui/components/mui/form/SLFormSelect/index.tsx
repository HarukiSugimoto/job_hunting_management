// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/form/SLFormSelect)

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  type MenuItemProps,
  Select,
  type SelectProps,
} from '@mui/material';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';

export type SLFormSelectProps<T extends FieldValues> = UseControllerProps<T> & {
  /**
   * name属性
   */
  name: SelectProps['name'];
  /**
   * セレクトボックスの選択肢
   *
   * type: { label: React.ReactNode; value: MenuItemProps['value'] }[]
   */
  options: { label: React.ReactNode; value: MenuItemProps['value'] }[];
  /**
   * 初期値
   */
  defaultValue?: SelectProps['value'];
  /**
   * ラベル
   */
  label?: string;
  /**
   * 未選択時のラベル
   * デフォルトは「選択してください」
   */
  customNonValueLabel?: SelectProps['label'];
  /**
   * 未選択の選択肢を表示するか
   * ラベルがある場合は強制的にfalseになる
   */
  showNonValueOption?: boolean;
  /**
   * disabled
   */
  disabled?: boolean;
  /**
   * select boxの幅
   * デフォルトは 'md'
   */
  widthType?: 'full' | 'sm' | 'md' | 'lg';
};

/**
 * React Hook Form のコントローラーを使用したセレクトボックス
 */
// eslint-disable-next-line react/destructuring-assignment
export const SLFormSelect = <T extends FieldValues>({
  widthType = 'lg', // デフォルト値を 'md' に設定
  ...props
}: SLFormSelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({
    name: props.name,
    control: props.control,
  });

  const options = props.showNonValueOption
    ? [
        {
          value: '',
          label: props.customNonValueLabel ?? '選択してください',
        } as SLFormSelectProps<T>['options'][0],
      ].concat(props.options ? props.options : [])
    : props.options;

  return (
    <FormControl fullWidth error={!!error}>
      {!!props.label && <InputLabel size="small">{props.label}</InputLabel>}
      <Select
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        defaultValue={props?.defaultValue}
        disabled={props.disabled}
        displayEmpty={!props.label && props.showNonValueOption}
        error={!!error?.message}
        label={props.label}
        size="small"
        sx={(theme) => ({
          width: '100%', // 親要素を超えないようにする
          maxWidth:
            widthType === 'sm' ? 200 : widthType === 'md' ? 300 : widthType === 'lg' ? 400 : '100%',
          [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
          },
        })}
        variant="outlined"
      >
        {options?.map((option, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <MenuItem key={`${option.value ?? ''}-${i}`} value={option.value ?? ''}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {!!error?.message && <FormHelperText error>{error?.message}</FormHelperText>}
    </FormControl>
  );
};
