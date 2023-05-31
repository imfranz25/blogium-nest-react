import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, icon: Icon }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
