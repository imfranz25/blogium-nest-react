/* eslint-disable @typescript-eslint/no-explicit-any */
import * as api from '../../api';
import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Row, Typography } from 'antd';
import { AiOutlineLogin } from 'react-icons/ai';

import useAuth from '../../hooks/useAuth';
import getErrorMessage from '../../utils/getErrorMessage';
import Input from '../../components/Input';
import { LoginWrapper, LoginCard, ActionWrapper } from './styles';

interface FormLogin {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { registerToken } = useAuth();
  const [isLoading, isSetLoading] = useState(false);

  const onLogin = useCallback(
    async (credentials: FormLogin) => {
      try {
        isSetLoading(true);
        const response = await api.loginUser(credentials);

        toast.success('Logged in');
        registerToken(response?.data?.accessToken);
        navigate('/feed');
      } catch (error: any) {
        toast.error(getErrorMessage(error));
      } finally {
        isSetLoading(false);
      }
    },
    [navigate, registerToken]
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
