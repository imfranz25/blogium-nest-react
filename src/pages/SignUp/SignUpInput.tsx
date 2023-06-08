import Input from '../../components/Input';
import Date from '../../components/Input/DateInput';
import { Column } from './styles';

interface SignUpInputProps {
  label: string;
  id: string;
  type?: 'password' | 'email' | 'text' | 'date';
  required?: boolean;
}

const SignUpInput: React.FC<SignUpInputProps> = ({
  label,
  id,
  required = false,
  type = 'text',
}) => {
  const isDate = type === 'date';

  return (
    <Column xs={24} sm={24} md={12}>
      {isDate ? (
        <Date type="date" id="birthday" label="Birthday" required />
      ) : (
        <Input label={label} id={id} required={required} />
      )}
    </Column>
  );
};

export default SignUpInput;
