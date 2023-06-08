import React from 'react';
import { FormLabelAlign } from 'antd/es/form/interface';
import type { DatePickerProps as DatePickerTypes } from 'antd';
import { FieldErrors, FieldValues, UseFormSetValue } from 'react-hook-form';

import { FormItem, DatePicker } from './styles';

interface DatePickerProps {
  id: string;
  label: string;
  type?: string;
  errors: FieldErrors;
  disabled?: boolean;
  required?: boolean;
  setValue: UseFormSetValue<FieldValues>;
}

const Date: React.FC<DatePickerProps> = ({
  label,
  id,
  errors,
  setValue,
  disabled,
  required = false,
}) => {
  const inputCol = { span: 24 };
  const textHelper = errors[id] && <span>{errors[id]?.message as React.ReactNode}</span>;
  const onChange: DatePickerTypes['onChange'] = (_date, dateString) => {
    setValue(id, dateString, {
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <FormItem
      name={id}
      label={label}
      help={textHelper}
      labelCol={inputCol}
      wrapperCol={inputCol}
      labelAlign={'top' as FormLabelAlign}
      rules={[{ required: required, message: `Please select your ${id}` }]}
    >
      <DatePicker onChange={onChange} disabled={disabled} />
    </FormItem>
  );
};

export default Date;
