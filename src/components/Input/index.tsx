import React, { ChangeEvent, useCallback } from 'react';
import { FieldErrors, FieldValues, UseFormSetValue } from 'react-hook-form';
import { Input as AntdInput } from 'antd';
import { FormLabelAlign } from 'antd/es/form/interface';
import { FormItem } from './styles';

interface InputProps {
  id: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
  placeholder?: string;
  autoComplete?: string;
  suffix?: React.ReactNode;
  setValue: UseFormSetValue<FieldValues>;
  type?: 'password' | 'textarea' | 'date' | 'email';
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  errors,
  setValue,
  suffix,
  type = 'text',
  required = false,
  placeholder = '',
  autoComplete = 'off',
}) => {
  let InputComponent;
  const inputCol = { span: 24 };
  const labelText = label !== 'Comment' ? label : null;
  const textHelper = errors[id] && <span>{errors[id]?.message as React.ReactNode}</span>;

  const onChangeInput: React.ChangeEventHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(id, event.target.value, {
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [id, setValue]
  );

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
      help={textHelper}
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
        onChange={onChangeInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </FormItem>
  );
};

const MemoizedInput = React.memo(Input);

export default MemoizedInput;
