import { Col, Row, Typography } from 'antd';

import ChangePasswordForm from './PasswordForm';
import EditProfileForm from './EditProfileForm';

const EditProfilePage = () => {
  return (
    <Row justify="space-around">
      <Col span={16}>
        <Typography.Title level={2}>Profile</Typography.Title>
        <EditProfileForm />
        <ChangePasswordForm />
      </Col>
    </Row>
  );
};

export default EditProfilePage;
