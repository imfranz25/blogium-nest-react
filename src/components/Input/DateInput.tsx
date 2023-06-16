import React from 'react';
import { FormLabelAlign } from 'antd/es/form/interface';

import { FormItem, DatePicker } from './styles';

interface DatePickerProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}

const Date: React.FC<DatePickerProps> = ({ label, id, disabled, required = false }) => {
  const inputCol = { span: 24 };

  return (
    <FormItem
      name={id}
      label={label}
      labelCol={inputCol}
      wrapperCol={inputCol}
      labelAlign={'top' as FormLabelAlign}
      rules={[{ required: required, message: `Please select your ${id}` }]}
    >
      <DatePicker format="YYYY/MM/DD" disabled={disabled} />
    </FormItem>
  );
};

export default Date;
