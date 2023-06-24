import { Col, Row } from 'antd';

import { Title } from './styles';
import ChangePasswordForm from '../../components/PasswordForm';
import EditProfileForm from '../../components/EditProfileForm';

const EditProfilePage = () => {
  return (
    <Row justify="space-around">
      <Col span={16}>
        <Title level={2}>Profile</Title>
        <EditProfileForm />
        <ChangePasswordForm />
      </Col>
    </Row>
  );
};

export default EditProfilePage;
