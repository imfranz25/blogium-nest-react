import dayjs from 'dayjs';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Button, Col, Form, Row, Typography } from 'antd';

import { EditCard } from './styles';
import useAuth from '../../hooks/useAuth';
import { Column } from '../SignUp/styles';
import Input from '../../components/Input';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { GenDetails } from '../../types/formTypes';
import DateInput from '../../components/Input/DateInput';
import FileUploader from '../../components/Input/FileUploader';

const EditProfilePage = () => {
  const [form] = Form.useForm();
  const { user: userData, registerSession } = useAuth();

  const { isLoading: isFormLoading, refetch: updateUser } = useFetch({
    endpoint: `/user/${userData?.userId}`,
    skipInitialInvocation: true,
  });

  const onSaveGeneralInfo = useCallback(
    async (genDetails: GenDetails) => {
      const response = await updateUser({ method: httpMethod.PATCH, data: genDetails });

      if (!response) {
        return;
      }

      form.resetFields();
      toast.success('User info updated');
      registerSession(response.data.accessToken);
    },
    [updateUser, registerSession, form]
  );

  return (
    <Row justify="space-around">
      <Col span={16}>
        <Typography.Title level={2}>Profile</Typography.Title>
        <EditCard bordered hoverable>
          <Typography.Title level={2}>General Information</Typography.Title>
          <Form
            form={form}
            onFinish={onSaveGeneralInfo}
            initialValues={{
              firstName: userData?.firstName,
              lastName: userData?.lastName,
              email: userData?.email,
              bio: userData?.bio,
              birthday: dayjs(userData?.birthday, 'YYYY/MM/DD'),
            }}
          >
            <Row>
              <Column xs={24} sm={24} md={12}>
                <FileUploader id="profilePicture" />
              </Column>
              <Column xs={24} sm={24} md={12}>
                <Input label="Bio" type="textarea" id="bio" disabled={isFormLoading} />
              </Column>
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
