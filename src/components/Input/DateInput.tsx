import dayjs from 'dayjs';
import React, { useCallback } from 'react';

import { FormItem, DatePicker } from './styles';
import { requiredField } from '../../utils/inputValidators';
import { FormLabelAlign } from 'antd/es/form/interface';
import { format, subYears } from 'date-fns';

interface DatePickerProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}

const DateInput: React.FC<DatePickerProps> = ({ label, id, disabled, required = false }) => {
  const inputCol = { span: 24 };

  const disabledDate = useCallback((current: dayjs.Dayjs): boolean => {
    const currentDate = new Date();
    const eighteenYearsAgo = subYears(currentDate, 18);
    const formattedDate = format(eighteenYearsAgo, 'yyyy-MM-dd');

    return current.isAfter(dayjs(formattedDate));
  }, []);

  return (
    <FormItem
      name={id}
      label={label}
      labelCol={inputCol}
      wrapperCol={inputCol}
      labelAlign={'top' as FormLabelAlign}
      rules={required ? requiredField(label) : []}
    >
      <DatePicker
        format="YYYY/MM/DD"
        disabled={disabled}
        disabledDate={disabledDate}
        defaultPickerValue={dayjs('2000')}
        placement="bottomRight"
      />
    </FormItem>
  );
};

export default DateInput;
