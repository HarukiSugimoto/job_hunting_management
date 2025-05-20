// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/form/SLFormMultiSelect)

import { Check, Close } from '@mui/icons-material';
import {
  TextField,
  Autocomplete,
  MenuItem,
  FormControl,
  type MenuItemProps,
  type SelectProps,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { type FieldValues, useController, type UseControllerProps } from 'react-hook-form';

export type SLFormMultiSelectProps<T extends FieldValues> = UseControllerProps<T> & {
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
   * 未選択時のラベル
   * デフォルトは「選択してください」
   */
  customNonValueLabel?: string;
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
 * React Hook Form のコントローラーを使用したマルチセレクトボックス
 *
 * optionの値をAPIから受け取る場合は要調整
 */
export const SLFormMultiSelect = <T extends FieldValues>(props: SLFormMultiSelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({
    name: props.name,
    control: props.control,
  });

  return (
    <FormControl fullWidth error={!!error}>
      <Autocomplete
        disableCloseOnSelect
        fullWidth
        multiple
        getOptionLabel={(option) => option.label as string}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        options={props.options}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            error={!!error}
            helperText={!!error && error?.message}
            placeholder={
              Array.isArray(field.value) && field.value.length > 0
                ? ''
                : props.customNonValueLabel
                  ? props.customNonValueLabel
                  : '選択してください'
            }
            size="small"
            variant="outlined"
          />
        )}
        renderOption={(optionData, option, { selected }) => (
          <MenuItem
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...optionData}
            key={String(option.value)}
            sx={{ alignItems: 'center', gap: 1 }}
            value={option.value}
          >
            {option.label}
            {selected ? <Check color="info" /> : null}
          </MenuItem>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={key}
                label={option.label}
                sx={{
                  borderRadius: '4px',
                  height: 22,
                  fontSize: 12,
                }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...tagProps}
                deleteIcon={<Close />}
              />
            );
          })
        }
        value={props.options.filter((option) =>
          Array.isArray(field.value) ? field.value.includes(option.value) : false
        )}
        // eslint-disable-next-line @typescript-eslint/naming-convention
        onChange={(_, newValue) => {
          field.onChange(newValue.map((option) => option.value));
        }}
      />
    </FormControl>
  );
};
