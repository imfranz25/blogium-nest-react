import { toast } from 'react-hot-toast';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Typography } from 'antd';
import { IoCreateOutline } from 'react-icons/io5';

import useAuth from '../../hooks/useAuth';
import Input from '../../components/Input';
import Date from '../../components/Input/DateInput';
import { SignUpWrapper, SignUpCard, Column, ActionWrapper } from './styles';
import { UserDetails } from '../../types/formTypes';
import useFetch from '../../hooks/useFetch';

const SignUpPage = () => {
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

  const onSignUp = useCallback(
    async (userDetails: UserDetails) => {
      const signUpResponse = await createUser({ method: 'POST', data: userDetails });

      if (!signUpResponse) {
        return;
      }

      const logInResponse = await loginUser({
        method: 'POST',
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
        <Form onFinish={onSignUp}>
          <Row>
            <Column xs={24} sm={24} md={12}>
              <Input label="First Name" id="firstName" required />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input label="Last Name" id="lastName" required />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input label="Email" type="email" id="email" required />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Date id="birthday" label="Birthday" required />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input label="Password" id="password" type="password" required />
            </Column>
            <Column xs={24} sm={24} md={12}>
              <Input label="Confirm Password" id="confirmPassword" type="password" required />
            </Column>
          </Row>
          <ActionWrapper>
            <Button
              size="large"
              type="primary"
              icon={<IoCreateOutline />}
              loading={signUpLoading || logInLoading}
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
