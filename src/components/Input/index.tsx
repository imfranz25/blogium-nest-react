import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  register,
  required,
  errors,
  autoComplete = 'off',
  type = 'text',
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        disabled={disabled}
        autoComplete={autoComplete}
        {...register(id, { required })}
      />
      {errors[id] && <p>Error in {label}</p>}
    </div>
  );
};

const MemoizedInput = React.memo(Input);

export default MemoizedInput;
