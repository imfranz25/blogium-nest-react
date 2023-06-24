import { useNavigate } from 'react-router-dom';
import { Button, Col, Layout, Row, Typography } from 'antd';

// import Navbar from '../../components/Navbar';
import { Content, Section, Title } from './styles';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* <Navbar /> */}
      <Content justify="space-around" align="middle" style={{}}>
        <Col span={16}>
          <Row justify="center">
            <Section>
              <Title>404</Title>
              <Typography.Paragraph>
                We are sorry, but the page you requested was not found
              </Typography.Paragraph>
              <Button onClick={() => navigate('/feed')} type="primary">
                Go back
              </Button>
            </Section>
          </Row>
        </Col>
      </Content>
    </Layout>
  );
};

export default PageNotFound;
