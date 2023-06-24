import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai';
import { Button, Form, Row, Typography, Image } from 'antd';

import useAuth from '../../hooks/useAuth';
import Input from '../../components/Input';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import blogiumLogo from '../../assets/logo.png';
import { Credentials } from '../../types/formTypes';
import { Button as StyledButton } from '../SignUp/styles';
import { BrandContainer } from '../../components/Navbar/styles';
import { LoginWrapper, LoginCard, ActionWrapper } from './styles';
import { requiredField, emailValidator } from '../../utils/inputValidators';

const LoginPage = () => {
  const navigate = useNavigate();
  const { registerSession } = useAuth();

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

      /* Access token created */
      if (response?.status === 201) {
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
            id="email"
            type="email"
            label="Email"
            disabled={isLoading}
            rules={emailValidator}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            disabled={isLoading}
            rules={requiredField('Password')}
          />
          <ActionWrapper>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              icon={<AiOutlineLogin />}
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
