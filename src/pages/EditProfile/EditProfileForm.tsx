import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useCallback, useEffect } from 'react';
import { Button, Form, Row, Typography } from 'antd';

import { EditCard } from './styles';
import useAuth from '../../hooks/useAuth';
import { Column } from '../SignUp/styles';
import Input from '../../components/Input';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { GenDetails } from '../../types/formTypes';
import DateInput from '../../components/Input/DateInput';
import FileUploader from '../../components/Input/FileUploader';
import { nameValidator, emailValidator } from '../../utils/inputValidators';

const ProfileForm = () => {
  const [userForm] = Form.useForm();
  const { user: userData, registerSession } = useAuth();

  const { isLoading: isFormLoading, refetch: updateUser } = useFetch({
    endpoint: `/user/${userData?.userId}`,
    skipInitialInvocation: true,
  });

  const onSaveGeneralInfo = useCallback(
    async (genDetails: GenDetails) => {
      const uploadedProfile = userForm.getFieldValue('profilePicture');

      /**
       * profile upload is option thus check
       * if the user upload a profile pic
       * before appending it to user form details
       */
      if (uploadedProfile) {
        genDetails.profilePicture = uploadedProfile;
      }

      const response = await updateUser({ method: httpMethod.PATCH, data: genDetails });

      if (!response) {
        return;
      }

      userForm.resetFields();
      toast.success('User info updated');
      registerSession(response.data.accessToken);
    },
    [updateUser, registerSession, userForm]
  );

  useEffect(() => {
    if (userData) {
      userForm.setFieldsValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        bio: userData.bio,
        birthday: dayjs(userData.birthday, 'YYYY/MM/DD'),
      });
    }
  }, [userData, userForm]);

  return (
    <EditCard bordered hoverable>
      <Typography.Title level={2}>General Information</Typography.Title>
      <Form form={userForm} onFinish={onSaveGeneralInfo}>
        <Row>
          <Column xs={24} sm={24} md={12}>
            <FileUploader
              defaultImg={userData?.profilePicture}
              id="profilePicture"
              disable={isFormLoading}
              form={userForm}
              preview={userData?.firstName}
            />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input label="Bio (Optional)" type="textarea" id="bio" disabled={isFormLoading} />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input
              label="First Name"
              id="firstName"
              disabled={isFormLoading}
              rules={nameValidator('First name')}
            />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input
              label="Last Name"
              id="lastName"
              disabled={isFormLoading}
              rules={nameValidator('Last name')}
            />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input
              label="Email"
              type="email"
              id="email"
              disabled={isFormLoading}
              rules={emailValidator}
            />
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
  );
};

export default ProfileForm;
