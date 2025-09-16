import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import type { TextFieldProps } from '@mui/material';


interface FormFieldProps extends Omit<TextFieldProps, 'name' | 'label' | 'value' | 'onChange' | 'error' | 'helperText' | 'select' | 'options' | 'disabled' | 'required' | 'type'> {
  name: string;
  label: string;
  value: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  select?: boolean;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  required?: boolean;
  type?: string;
}

const fieldSx = {
  '& .MuiInputBase-root': {
    fontSize: '1.1rem',
    minHeight: 56,
  },
  '& .MuiInputLabel-root': {
    fontSize: '1.05rem',
  },
};

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  select = false,
  options = [],
  disabled = false,
  required = false,
  type = 'text',
  ...rest
}) => {

  return (
    <TextField
      name={name}
      label={label}
      value={value || ''}
      onChange={onChange}
      fullWidth
      required={required}
      disabled={disabled}
      error={!!error}
      helperText={error || helperText}
      select={select}
      type={type}
      sx={fieldSx}
      InputLabelProps={type === 'date' ? { shrink: true } : undefined}
      {...rest}
    >
      {select
        ? options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        : null}
    </TextField>
  );
};

export default FormField;