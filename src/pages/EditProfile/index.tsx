import dayjs from 'dayjs';
import { Button, Col, Form, Row, Typography } from 'antd';

import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import { Column } from '../SignUp/styles';
import Input from '../../components/Input';
import DateInput from '../../components/Input/DateInput';
import { EditCard } from './styles';

const EditProfilePage = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();

  /* Profile Details */
  const { isLoading, resData } = useFetch({ endpoint: `/user/${user?.userId}` });
  const userData = resData?.data;

  const { isLoading: isFormLoading, refetch } = useFetch({
    endpoint: `/user/${user?.userId}`,
    skipInitialInvocation: true,
  });

  if (isLoading || !userData) {
    return <Loader />;
  }

  return (
    <Row justify="space-around">
      <Col span={16}>
        <EditCard bordered hoverable>
          <Typography.Title level={2}>General Information</Typography.Title>
          <Form
            form={form}
            initialValues={{
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              bio: userData.bio,
              birthday: dayjs(userData.birthday, 'YYYY/MM/DD'),
            }}
          >
            <Row>
              <Column xs={24} sm={24} md={12}>
                <Input label="First Name" id="firstName" disabled={isFormLoading} required />
              </Column>
              <Column xs={24} sm={24} md={12}>
                <Input label="Last Name" id="lastName" disabled={isFormLoading} required />
              </Column>
              <Column xs={24} sm={24} md={12}>
                <Input label="Email" type="email" id="email" disabled={isFormLoading} required />
              </Column>
              <Column xs={24} sm={24} md={12}>
                <DateInput id="birthday" label="Birthday" disabled={isFormLoading} required />
              </Column>
              <Column span={24}>
                <Input label="Bio" type="textarea" id="bio" disabled={isFormLoading} required />
              </Column>
              <Button size="large" type="primary" loading={isFormLoading} htmlType="submit">
                Save
              </Button>
            </Row>
          </Form>
        </EditCard>

        <EditCard bordered hoverable>
          <Typography.Title level={2}>Security Information</Typography.Title>
          <Form>
            <Row>
              <Column xs={24} sm={24} md={12}>
                <Input
                  type="password"
                  label="New Password"
                  id="newPassword"
                  disabled={isFormLoading}
                  required
                />
              </Column>
              <Column xs={24} sm={24} md={12}>
                <Input
                  type="password"
                  label="Confirm New Password"
                  id="confirmNewPassword"
                  disabled={isFormLoading}
                  required
                />
              </Column>
              <Column xs={24} sm={24} md={12}>
                <Input
                  type="password"
                  label="Old Password"
                  id="oldPassword"
                  disabled={isFormLoading}
                  required
                />
              </Column>
            </Row>
            <Button size="large" type="primary" loading={isFormLoading} htmlType="submit">
              Update Password
            </Button>
          </Form>
        </EditCard>
      </Col>
    </Row>
  );
};

export default EditProfilePage;
