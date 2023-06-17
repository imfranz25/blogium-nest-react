import toast from 'react-hot-toast';
import { useCallback } from 'react';
import { Button, Form, Row, Typography } from 'antd';

import { EditCard } from './styles';
import useAuth from '../../hooks/useAuth';
import { Column } from '../SignUp/styles';
import Input from '../../components/Input';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { PassDetails } from '../../types/formTypes';

const ChangePasswordForm = () => {
  const [passForm] = Form.useForm();
  const { user: userData } = useAuth();

  const { isLoading: isFormPassLoading, refetch: updatePassword } = useFetch({
    endpoint: `/user/password/${userData?.userId}`,
    skipInitialInvocation: true,
  });

  const onSavePassword = useCallback(
    async (passDetails: PassDetails) => {
      const response = await updatePassword({ method: httpMethod.PATCH, data: passDetails });

      if (!response) {
        return;
      }

      passForm.resetFields();
      toast.success('User pass updated');
    },
    [updatePassword, passForm]
  );

  return (
    <EditCard bordered hoverable>
      <Typography.Title level={2}>Security Information</Typography.Title>
      <Form form={passForm} onFinish={onSavePassword}>
        <Row>
          <Column xs={24} sm={24} md={12}>
            <Input
              type="password"
              label="New Password"
              id="newPassword"
              disabled={isFormPassLoading}
              required
            />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input
              type="password"
              label="Confirm New Password"
              id="confirmNewPassword"
              disabled={isFormPassLoading}
              required
            />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input
              type="password"
              label="Old Password"
              id="oldPassword"
              disabled={isFormPassLoading}
              required
            />
          </Column>
        </Row>
        <Button size="large" type="primary" loading={isFormPassLoading} htmlType="submit">
          Update Password
        </Button>
      </Form>
    </EditCard>
  );
};

export default ChangePasswordForm;
