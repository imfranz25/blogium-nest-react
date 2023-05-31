import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import Input from '../../components/Input';
import Button from '../../components/Button';

const LoginPage = () => {
  const [isDisable, setDisable] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: '', password: '' } });

  const onLogin = handleSubmit((data) => {
    setDisable(true);

    alert(JSON.stringify(data));

    setDisable(false);
  });

  return (
    <div>
      <Input label="Email" id="email" register={register} errors={errors} required />
      <Input
        label="Password"
        id="password"
        type="password"
        register={register}
        errors={errors}
        required
      />
      <Button label="Login" disabled={isDisable} onClick={onLogin} />
    </div>
  );
};

export default LoginPage;
