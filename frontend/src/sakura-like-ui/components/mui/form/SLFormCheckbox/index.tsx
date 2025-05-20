// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/form/SLFormCheckbox)

import {
  FormHelperText,
  FormControl,
  type CheckboxProps,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { type FieldValues, useController, type UseControllerProps } from 'react-hook-form';

export type SLFormCheckboxProps<T extends FieldValues> = UseControllerProps<T> & {
  /**
   * フォーム名
   */
  label?: string;
  /**
   * checkbox横につける文字列
   */
  valueLabel?: string;
  /**
   * checkboxのvalue
   */
  value: CheckboxProps['value'];

  /**
   * 入力不可にする
   */
  disabled?: boolean;
};

export const SLFormCheckbox = <T extends FieldValues>(props: SLFormCheckboxProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({
    name: props.name,
    control: props.control,
  });

  return (
    <FormControl sx={{ minWidth: 150 }}>
      <FormControlLabel
        checked={props.value === field.value}
        control={<Checkbox />}
        disabled={props.disabled}
        label={props.valueLabel}
        sx={{
          textAlign: 'left',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
      />
      {!!error?.message && <FormHelperText error>{error?.message}</FormHelperText>}
    </FormControl>
  );
};
