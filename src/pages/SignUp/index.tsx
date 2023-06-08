/* eslint-disable @typescript-eslint/no-explicit-any */
import * as api from '../../api';
import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Typography } from 'antd';
import { IoCreateOutline } from 'react-icons/io5';

import useAuth from '../../hooks/useAuth';
import getErrorMessage from '../../utils/getErrorMessage';
import Input from '../../components/Input';
import Date from '../../components/Input/DateInput';
import { SignUpWrapper, SignUpCard, InputCol, ActionWrapper } from './styles';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { registerToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthday: '',
    },
  });

  const onSignUp = useCallback(
    async (userDetails: FieldValues) => {
      setIsLoading(true);

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
        setIsLoading(false);
      }
    },
    [registerToken, navigate]
  );

  return (
    <SignUpWrapper>
      <SignUpCard bordered hoverable>
        <Row justify="center">
          <Typography.Title level={2}>Create an account</Typography.Title>
        </Row>

        <Form onFinish={handleSubmit(onSignUp)}>
          <Row>
            <InputCol xs={24} sm={24} md={12}>
              <Input
                label="First Name"
                id="firstName"
                errors={errors}
                setValue={setValue}
                required
              />
            </InputCol>
            <InputCol xs={24} sm={24} md={12}>
              <Input label="Last Name" id="lastName" errors={errors} setValue={setValue} required />
            </InputCol>
            <InputCol xs={24} sm={24} md={12}>
              <Input
                label="Email"
                type="email"
                id="email"
                errors={errors}
                setValue={setValue}
                required
              />
            </InputCol>
            <InputCol xs={24} sm={24} md={12}>
              <Date id="birthday" label="Birthday" setValue={setValue} errors={errors} required />
            </InputCol>
            <InputCol xs={24} sm={24} md={12}>
              <Input
                label="Password"
                id="password"
                type="password"
                errors={errors}
                setValue={setValue}
                required
              />
            </InputCol>
            <InputCol xs={24} sm={24} md={12}>
              <Input
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                errors={errors}
                setValue={setValue}
                required
              />
            </InputCol>
          </Row>
          <ActionWrapper>
            <Button
              size="large"
              type="primary"
              icon={<IoCreateOutline />}
              loading={isLoading}
              htmlType="submit"
            >
              Sign up
            </Button>
          </ActionWrapper>
        </Form>

        <Row justify="center">
          <Typography.Paragraph>
            Already have an account? <Link to="/">Login</Link>
          </Typography.Paragraph>
        </Row>
      </SignUpCard>
    </SignUpWrapper>
  );
};

export default SignUpPage;
