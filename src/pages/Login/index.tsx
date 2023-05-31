import { useCallback } from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import Input from '../../components/Input';

const LoginPage = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: '', password: '' } });

  const onLogin = useCallback(() => {
    alert('Login in submitted');
    reset();
  }, [reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onLogin)}>
        <Input label="Email" id="email" register={register} errors={errors} />
        <Input label="Password" id="password" type="password" register={register} errors={errors} />
      </form>
    </>
  );
};

export default LoginPage;
