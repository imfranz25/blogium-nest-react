/* eslint-disable @typescript-eslint/no-explicit-any */

import * as api from '../../api';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import getErrorMessage from '../../utils/getErrorMessage';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isDisable, setDisable] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: '', password: '' } });

  const onLogin = handleSubmit(async (credentials) => {
    setDisable(true);

    try {
      const response = await api.loginUser(credentials);
      const token = response.data;

      localStorage.setItem('token', token);
      navigate('/feed');
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }

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
