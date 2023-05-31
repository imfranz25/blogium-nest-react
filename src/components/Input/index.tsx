import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  register,
  required,
  errors,
  type = 'text',
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} disabled={disabled} {...register(id, { required })} />
      {errors[id] && <p>Error in {label}</p>}
    </div>
  );
};

export default Input;
