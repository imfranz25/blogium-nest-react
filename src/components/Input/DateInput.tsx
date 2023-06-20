import React, { useCallback } from 'react';
import { FormLabelAlign } from 'antd/es/form/interface';
import dayjs from 'dayjs';

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

  const disabledDate = useCallback((current: dayjs.Dayjs): boolean => {
    return current.isAfter(dayjs().endOf('day'));
  }, []);

  return (
    <FormItem
      name={id}
      label={label}
      labelCol={inputCol}
      wrapperCol={inputCol}
      labelAlign={'top' as FormLabelAlign}
      rules={[{ required: required, message: `Please select your ${id}` }]}
      initialValue={dayjs('1999-01-01')}
    >
      <DatePicker format="YYYY/MM/DD" disabled={disabled} disabledDate={disabledDate} />
    </FormItem>
  );
};

export default Date;
