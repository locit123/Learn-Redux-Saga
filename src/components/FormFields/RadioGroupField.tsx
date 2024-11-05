import React from 'react';
import { Control, useController } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
export interface RadioOption {
  label?: string;
  value: string | number;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export const RadioGroupField = ({
  name,
  control,
  label,
  disabled,
  options,
}: RadioGroupFieldProps) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl disabled={disabled} error={invalid} margin="normal" component={'fieldset'}>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
