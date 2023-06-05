import React, { ChangeEvent, useCallback } from 'react';
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Input as AntdInput, Form } from 'antd';
import { FormLabelAlign } from 'antd/es/form/interface';

interface InputProps {
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

const Input: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  register,
  required,
  errors,
  setValue,
  autoComplete = 'off',
  type = 'text',
}) => {
  const onChangeInput = useCallback(
    (value: ChangeEvent<HTMLInputElement>) => {
      setValue(id, value.target.value, {
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [id, setValue]
  );

  return (
    <>
      <Form.Item
        label={label}
        name={id}
        rules={[{ required, message: `Please enter ${label}` }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        labelAlign={'top' as FormLabelAlign}
        validateStatus={errors[id] ? 'error' : ''}
        help={errors[id] && <span>{errors[id]?.message as React.ReactNode}</span>}
      >
        <AntdInput
          {...register(id, { required })}
          id={id}
          type={type}
          disabled={disabled}
          autoComplete={autoComplete}
          onChange={onChangeInput}
        />
      </Form.Item>
    </>
  );
};

const MemoizedInput = React.memo(Input);

export default MemoizedInput;
