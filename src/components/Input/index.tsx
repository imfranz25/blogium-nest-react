import React from 'react';
import { Input as AntdInput } from 'antd';
import { FormLabelAlign } from 'antd/es/form/interface';
import { FormItem } from './styles';
import { RuleObject } from 'antd/es/form';

interface InputProps {
  id: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  suffix?: React.ReactNode;
  type?: 'password' | 'textarea' | 'email';
  rules?: RuleObject[];
}

const ignoreLabel = ['Comment', 'Post'];

const Input: React.FC<InputProps> = ({
  id,
  suffix,
  label,
  type = 'text',
  rules = [],
  placeholder = '',
  autoComplete = 'off',
  disabled = false,
}) => {
  let InputComponent;
  const inputCol = { span: 24 };
  const labelText = !ignoreLabel.includes(label || '') ? label : null;

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
      rules={rules}
    >
      <InputComponent
        id={id}
        type={type}
        suffix={suffix}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        rows={8}
      />
    </FormItem>
  );
};

const MemoizedInput = React.memo(Input);

export default MemoizedInput;
