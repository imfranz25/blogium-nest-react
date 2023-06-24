import toast from 'react-hot-toast';
import { useCallback } from 'react';
import { Button, Form, Row } from 'antd';

import {
  requiredField,
  passwordValidator,
  confirmPasswordValidator,
} from '../utils/inputValidators';
import Input from './Input';
import Loader from './Loader';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import { httpMethod } from '../constants';
import { Column } from '../pages/SignUp/styles';
import { PassDetails } from '../types/formTypes';
import { EditCard, Title } from '../pages/EditProfile/styles';

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

      if (response) {
        passForm.resetFields();
        toast.success('User pass updated');
      }
    },
    [updatePassword, passForm]
  );

  if (!userData) {
    return <Loader />;
  }

  return (
    <EditCard bordered hoverable>
      <Title level={2}>Security Information</Title>
      <Form form={passForm} onFinish={onSavePassword}>
        <Row>
          <Column xs={24} sm={24} md={12}>
            <Input
              type="password"
              id="newPassword"
              label="New Password"
              rules={passwordValidator}
              disabled={isFormPassLoading}
            />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input
              type="password"
              id="confirmNewPassword"
              label="Confirm New Password"
              disabled={isFormPassLoading}
              rules={confirmPasswordValidator(passForm, 'newPassword')}
            />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input
              type="password"
              id="oldPassword"
              label="Old Password"
              disabled={isFormPassLoading}
              rules={requiredField('Old password')}
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
