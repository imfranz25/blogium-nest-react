import React from 'react';
import { Input as AntdInput } from 'antd';

import { FormItem } from './styles';
import { RuleObject } from 'antd/es/form';
import { FormLabelAlign } from 'antd/es/form/interface';

interface InputProps {
  id: string;
  label?: string;
  disabled?: boolean;
  rules?: RuleObject[];
  placeholder?: string;
  autoComplete?: string;
  suffix?: React.ReactNode;
  type?: 'password' | 'textarea' | 'email';
}

const ignoreLabel = ['Comment', 'Post'];

const Input: React.FC<InputProps> = ({
  id,
  suffix,
  label,
  rules = [],
  type = 'text',
  placeholder = '',
  autoComplete = 'off',
  disabled = false,
}) => {
  let InputComponent;
  const inputCol = { span: 24 };
  const labelText = !ignoreLabel.includes(label ?? '') ? label : null;

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
      rules={rules}
      label={labelText}
      labelCol={inputCol}
      wrapperCol={inputCol}
      labelAlign={'top' as FormLabelAlign}
    >
      <InputComponent
        id={id}
        rows={9}
        type={type}
        suffix={suffix}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{ resize: 'none' }}
      />
    </FormItem>
  );
};

const MemoizedInput = React.memo(Input);

export default MemoizedInput;
