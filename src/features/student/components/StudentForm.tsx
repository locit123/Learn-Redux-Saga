import { Student } from 'models/student';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { InputField, RadioGroupField } from 'components/FormFields';
import { useAppSelector } from 'app/hooks';
import { selectCityOptions } from 'features/city/citySlice';
import { SelectField } from 'components/FormFields/SelectField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface StudentFormProps {
  initialValue?: Student;
  onSubmit?: (formValues: Student) => void;
}
const schema = yup
  .object({
    name: yup
      .string()
      .required('Please enter name')
      .test('name', 'Please enter at last to works', (value) => {
        if (!value) return true;

        const isVal = value.split(' ');
        return isVal.filter((x) => Boolean(x)).length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter a positive number.')
      .integer('Please enter an integer.')
      .required('please enter age')
      .typeError('Please enter a positive number.')
      .min(18, 'Min is 18')
      .max(60, 'Max is 60'),

    mark: yup
      .number()
      .positive('Please enter a positive number.')
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter mark')
      .typeError('Please enter a positive number.'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please se;ect either male of female.')
      .required('Please select gender'),
    city: yup.string().required('Please select city.'),
  })
  .required();

export const StudentForm = ({ initialValue, onSubmit }: StudentFormProps) => {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
        />

        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField options={cityOptions} name="city" control={control} label="City" />
        )}
        {error && (
          <Box mb={1}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <Box>
          <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />} Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};
