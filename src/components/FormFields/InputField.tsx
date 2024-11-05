import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
import { TextField } from '@mui/material';
export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export const InputField = ({ name, control, label, ...inputProps }: InputFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      value={value}
      onChange={onChange}
      id="outlined-basic"
      label={label}
      variant="outlined"
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
};
