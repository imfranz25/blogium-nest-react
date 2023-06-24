import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineLogin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Typography, Image } from 'antd';

import useAuth from '../../hooks/useAuth';
import Input from '../../components/Input';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import blogiumLogo from '../../assets/logo.png';
import { Credentials } from '../../types/formTypes';
import { BrandContainer } from '../../components/Navbar/styles';
import { LoginWrapper, LoginCard, ActionWrapper } from './styles';
import { Button as StyledButton } from '../SignUp/styles';
import { requiredField, emailValidator } from '../../utils/inputValidators';

const LoginPage = () => {
  const { registerSession } = useAuth();
  const navigate = useNavigate();

  const { isLoading, refetch: loginUser } = useFetch({
    endpoint: '/auth/login',
    skipInitialInvocation: true,
    includeToken: false,
  });

  const navigateToSignUp = useCallback(() => {
    if (isLoading) return;

    navigate('/sign-up');
  }, [isLoading, navigate]);

  const onLogin = useCallback(
    async (credentials: Credentials) => {
      const response = await loginUser({ method: httpMethod.POST, data: credentials });

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
        <Row justify="center" style={{ margin: '20px 0' }}>
          <BrandContainer>
            <Image alt="Blogium" width={52} preview={false} src={blogiumLogo} />
            <Typography.Text>Blogium</Typography.Text>
          </BrandContainer>
        </Row>
        <Form onFinish={onLogin}>
          <Input
            label="Email"
            type="email"
            id="email"
            disabled={isLoading}
            rules={emailValidator}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            disabled={isLoading}
            rules={requiredField('Password')}
          />
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
            Don&apos;t have an account?
            <StyledButton type="link" onClick={navigateToSignUp}>
              Sign up
            </StyledButton>
          </Typography.Paragraph>
        </Row>
      </LoginCard>
    </LoginWrapper>
  );
};

export default LoginPage;
