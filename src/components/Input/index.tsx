import React from 'react';
import { Input as AntdInput } from 'antd';
import { FormLabelAlign } from 'antd/es/form/interface';
import { FormItem } from './styles';

interface InputProps {
  id: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  suffix?: React.ReactNode;
  type?: 'password' | 'textarea' | 'date' | 'email';
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  suffix,
  type = 'text',
  required = false,
  placeholder = '',
  autoComplete = 'off',
}) => {
  let InputComponent;
  const inputCol = { span: 24 };
  const labelText = label !== 'Comment' ? label : null;

  switch (type) {
    case 'password':
      InputComponent = AntdInput.Password;
      break;
    case 'textarea':
      InputComponent = AntdInput.TextArea;
      break;
    default:
      InputComponent = AntdInput;
  }

  return (
    <FormItem
      name={id}
      label={labelText}
      labelCol={inputCol}
      wrapperCol={inputCol}
      labelAlign={'top' as FormLabelAlign}
      rules={[{ required, message: `${label} is required` }]}
    >
      <InputComponent
        id={id}
        type={type}
        suffix={suffix}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </FormItem>
  );
};

const MemoizedInput = React.memo(Input);

export default MemoizedInput;
