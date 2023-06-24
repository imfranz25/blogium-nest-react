import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Form, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IoCreateOutline } from 'react-icons/io5';

import useAuth from '../../hooks/useAuth';
import Input from '../../components/Input';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { UserDetails } from '../../types/formTypes';
import DateInput from '../../components/Input/DateInput';
import { SignUpWrapper, SignUpCard, Column, ActionWrapper, Button } from './styles';
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from '../../utils/inputValidators';
import { Title } from '../EditProfile/styles';

const SignUpPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { registerSession } = useAuth();

  const { isLoading: signUpLoading, refetch: createUser } = useFetch({
    endpoint: '/user',
    skipInitialInvocation: true,
    includeToken: false,
  });

  const { isLoading: logInLoading, refetch: loginUser } = useFetch({
    endpoint: '/auth/login',
    skipInitialInvocation: true,
    includeToken: false,
  });

  const isFormLoading = signUpLoading || logInLoading;

  const navigateToLogin = useCallback(() => {
    if (isFormLoading) return;

    navigate('/');
  }, [isFormLoading, navigate]);

  const onSignUp = useCallback(
    async (userDetails: UserDetails) => {
      const signUpResponse = await createUser({ method: httpMethod.POST, data: userDetails });

      /* Error -> creating user */
      if (signUpResponse?.status !== 201) {
        return;
      }

      const logInResponse = await loginUser({
        method: httpMethod.POST,
        data: { email: userDetails.email, password: userDetails.password },
      });

      /* Error -> creating access token */
      if (logInResponse?.status !== 201) {
        return;
      }

      toast.success('Account successfully created');
      registerSession(logInResponse.data.accessToken);
      navigate('/feed');
    },
    [registerSession, navigate, createUser, loginUser]
  );

  return (
    <SignUpWrapper>
      <SignUpCard bordered hoverable>
        <Row justify="center">
          <Title level={2} style={{ marginBottom: '40px' }}>
            Create an account
          </Title>
        </Row>
        <Form onFinish={onSignUp} form={form}>
          <Row>
            <Column xs={24} sm={24} md={12}>
              <Input
                id="firstName"
                label="First Name"
                disabled={isFormLoading}
                rules={nameValidator('First name')}
              />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input
                id="lastName"
                label="Last Name"
                disabled={isFormLoading}
                rules={nameValidator('Last name')}
              />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input
                id="email"
                type="email"
                label="Email"
                disabled={isFormLoading}
                rules={emailValidator}
              />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <DateInput id="birthday" label="Birthday" disabled={isFormLoading} required />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input
                id="password"
                type="password"
                label="Password"
                disabled={isFormLoading}
                rules={passwordValidator}
              />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                disabled={isFormLoading}
                rules={confirmPasswordValidator(form, 'password')}
              />
            </Column>
          </Row>
          <ActionWrapper>
            <Button
              size="large"
              type="primary"
              icon={<IoCreateOutline />}
              loading={isFormLoading}
              htmlType="submit"
            >
              Sign up
            </Button>
          </ActionWrapper>
        </Form>

        <Row justify="center">
          <Typography.Paragraph>
            Already have an account?
            <Button type="link" onClick={navigateToLogin}>
              Login
            </Button>
          </Typography.Paragraph>
        </Row>
      </SignUpCard>
    </SignUpWrapper>
  );
};

export default SignUpPage;
