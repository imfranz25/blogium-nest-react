import { toast } from 'react-hot-toast';
import { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Row, Typography } from 'antd';
import { AiOutlineLogin } from 'react-icons/ai';

import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { LoginWrapper, LoginCard, ActionWrapper } from './styles';
import { Credentials } from '../../types/formTypes';

const LoginPage = () => {
  const { registerSession } = useAuth();
  const navigate = useNavigate();
  const { isLoading, refetch: loginUser } = useFetch({
    endpoint: '/auth/login',
    skipInitialInvocation: true,
  });

  const onLogin = useCallback(
    async (credentials: Credentials) => {
      const response = await loginUser({ method: 'POST', data: credentials });

      if (response) {
        toast.success('Logged in');
        registerSession(response.data.accessToken);
        navigate('/feed');
      }
    },
    [navigate, registerSession, loginUser]
  );

  return (
    <LoginWrapper>
      <LoginCard bordered hoverable>
        <Row justify="center">
          <Typography.Title level={3}>Welcome back!</Typography.Title>
        </Row>
        <Form onFinish={onLogin}>
          <Input label="Email" type="email" id="email" required />
          <Input label="Password" id="password" type="password" required />
          <ActionWrapper>
            <Button
              size="large"
              type="primary"
              icon={<AiOutlineLogin />}
              loading={isLoading}
              htmlType="submit"
            >
              Login
            </Button>
          </ActionWrapper>
        </Form>
        <Row justify="center">
          <Typography.Paragraph>
            Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
          </Typography.Paragraph>
        </Row>
      </LoginCard>
    </LoginWrapper>
  );
};

export default LoginPage;
