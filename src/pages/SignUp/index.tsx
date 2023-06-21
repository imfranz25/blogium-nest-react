import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IoCreateOutline } from 'react-icons/io5';
import { Button, Form, Row, Typography } from 'antd';

import useAuth from '../../hooks/useAuth';
import Input from '../../components/Input';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { UserDetails } from '../../types/formTypes';
import DateInput from '../../components/Input/DateInput';
import { SignUpWrapper, SignUpCard, Column, ActionWrapper } from './styles';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  confirmPasswordValidator,
} from '../../utils/inputValidators';

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

  const onSignUp = useCallback(
    async (userDetails: UserDetails) => {
      const signUpResponse = await createUser({ method: httpMethod.POST, data: userDetails });

      if (!signUpResponse) {
        return;
      }

      const logInResponse = await loginUser({
        method: httpMethod.POST,
        data: { email: userDetails.email, password: userDetails.password },
      });

      if (logInResponse) {
        toast.success('Account successfully created');
        registerSession(logInResponse.data.accessToken);
        navigate('/feed');
      }
    },
    [registerSession, navigate, createUser, loginUser]
  );

  return (
    <SignUpWrapper>
      <SignUpCard bordered hoverable>
        <Row justify="center">
          <Typography.Title level={2}>Create an account</Typography.Title>
        </Row>
        <Form onFinish={onSignUp} form={form}>
          <Row>
            <Column xs={24} sm={24} md={12}>
              <Input
                label="First Name"
                id="firstName"
                disabled={isFormLoading}
                rules={nameValidator('First name')}
              />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input
                label="Last Name"
                id="lastName"
                disabled={isFormLoading}
                rules={nameValidator('Last name')}
              />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input
                label="Email"
                type="email"
                id="email"
                disabled={isFormLoading}
                rules={emailValidator}
              />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <DateInput id="birthday" label="Birthday" disabled={isFormLoading} required />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input
                label="Password"
                id="password"
                type="password"
                disabled={isFormLoading}
                rules={passwordValidator}
              />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input
                label="Confirm Password"
                id="confirmPassword"
                type="password"
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
            Already have an account? <Link to="/">Login</Link>
          </Typography.Paragraph>
        </Row>
      </SignUpCard>
    </SignUpWrapper>
  );
};

export default SignUpPage;
