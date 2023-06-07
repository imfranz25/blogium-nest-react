import React, { ChangeEvent, useCallback } from 'react';
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Input as AntdInput } from 'antd';
import { FormLabelAlign } from 'antd/es/form/interface';
import { FormItem } from './styles';

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  errors: FieldErrors;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  placeholder?: string;
  suffix?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  register,
  errors,
  setValue,
  suffix,
  required = false,
  placeholder = '',
  autoComplete = 'off',
  type = 'text',
}) => {
  let InputComponent;
  const textHelper = errors[id] && <span>{errors[id]?.message as React.ReactNode}</span>;
  const hasError = errors[id] ? 'error' : '';
  const onChangeInput = useCallback(
    (value: ChangeEvent<HTMLInputElement>) => {
      setValue(id, value.target.value, {
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [id, setValue]
  );

  if (type === 'password') {
    InputComponent = AntdInput.Password;
  } else {
    InputComponent = AntdInput;
  }

  return (
    <FormItem
      label={label}
      name={id}
      rules={[{ required, message: `${label} is required` }]}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      labelAlign={'top' as FormLabelAlign}
      validateStatus={hasError}
      help={textHelper}
    >
      <InputComponent
        {...register(id, { required })}
        id={id}
        type={type}
        disabled={disabled}
        autoComplete={autoComplete}
        onChange={onChangeInput}
        placeholder={placeholder}
        suffix={suffix}
      />
    </FormItem>
  );
};

const MemoizedInput = React.memo(Input);

export default MemoizedInput;
