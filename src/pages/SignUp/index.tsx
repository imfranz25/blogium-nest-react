/* eslint-disable @typescript-eslint/no-explicit-any */
import * as api from '../../api';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import getErrorMessage from '../../utils/getErrorMessage';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { registerToken } = useAuth();
  const [isDisable, setDisable] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  });

  const onSignUp = handleSubmit(async (userDetails) => {
    setDisable(true);

    try {
      await api.createUser(userDetails);
      const { email, password } = userDetails;
      const response = await api.loginUser({ email, password });

      toast.success('Account successfully created');
      registerToken(response?.data?.accessToken);
      navigate('/feed');
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setDisable(false);
    }
  });

  return (
    <div>
      <Input label="First Name" id="firstName" register={register} errors={errors} required />
      <Input label="Last Name" id="lastName" register={register} errors={errors} required />
      <Input label="Email" type="email" id="email" register={register} errors={errors} required />
      <Input
        label="Password"
        id="password"
        type="password"
        register={register}
        errors={errors}
        required
      />
      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        register={register}
        errors={errors}
        required
      />
      <Button label="Sign up" disabled={isDisable} onClick={onSignUp} />
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
