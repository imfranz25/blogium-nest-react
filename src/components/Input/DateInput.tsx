import React from 'react';
import { DatePicker } from 'antd';
import type { DatePickerProps as DatePickerTypes } from 'antd';
import { FormLabelAlign } from 'antd/es/form/interface';
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { FormItem } from './styles';

interface DatePickerProps {
  id: string;
  label: string;
  type?: string;
  errors: FieldErrors;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const Date: React.FC<DatePickerProps> = ({ label, id, errors, setValue, required = false }) => {
  const onChange: DatePickerTypes['onChange'] = (_date, dateString) => {
    setValue(id, dateString, {
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <FormItem
      label={label}
      name={id}
      rules={[{ required: required, message: `Please select your ${id}` }]}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      labelAlign={'top' as FormLabelAlign}
      validateStatus={errors[id] ? 'error' : ''}
      help={errors[id] && <span>{errors[id]?.message as React.ReactNode}</span>}
    >
      <DatePicker style={{ width: '100%' }} onChange={onChange} />
    </FormItem>
  );
};

export default Date;
