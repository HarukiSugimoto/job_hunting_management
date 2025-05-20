// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/form/SLFormCheckboxGroup)

import {
  FormControl,
  type CheckboxProps,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from '@mui/material';
import { type FieldValues, useController, type UseControllerProps } from 'react-hook-form';

export type SLFormCheckboxGroupProps<T extends FieldValues> = UseControllerProps<T> & {
  /**
   * フォーム名
   */
  label?: string;
  /**
   * checkboxの選択肢
   */
  options?: { label: string; value: CheckboxProps['value']; disabled?: boolean }[];

  /**
   * 入力不可にする
   */
  disabled?: boolean;

  /**
   * 選択肢を横並びにするか
   */
  row?: boolean;
};

/**
 * React Hook Form のコントローラーを利用した複数選択用のチェックボックス
 */
export const SLFormCheckboxGroup = <T extends FieldValues>(props: SLFormCheckboxGroupProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({
    name: props.name,
    control: props.control,
  });

  const handleCheck = (checkedId: unknown) => {
    const arrValue = field.value;
    const newIds = arrValue?.includes(checkedId)
      ? arrValue?.filter((id: unknown) => id !== checkedId)
      : [...(arrValue ?? []), checkedId];

    return newIds;
  };

  const defaultValue = field.value;

  return (
    <FormControl fullWidth={true} sx={{ minWidth: 120 }}>
      <FormGroup row={props.row}>
        {props.options?.map((option) => (
          <FormControlLabel
            key={option.label + option.value}
            control={
              <Checkbox
                checked={defaultValue?.includes(option.value)}
                disabled={option.disabled}
                name={`${props.name}`}
                value={option.value}
                onChange={() => field.onChange(handleCheck(option.value))}
              />
            }
            disabled={props.disabled}
            label={option.label}
            value={option.value}
          />
        ))}
      </FormGroup>
      {!!error?.message && <FormHelperText error>{error?.message}</FormHelperText>}
    </FormControl>
  );
};
