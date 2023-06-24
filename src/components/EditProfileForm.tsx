import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { Button, Form, Row } from 'antd';
import { useCallback, useEffect } from 'react';

import Input from './Input';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import { httpMethod } from '../constants';
import DateInput from './Input/DateInput';
import { Column } from '../pages/SignUp/styles';
import FileUploader from './Input/FileUploader';
import { GenDetails } from '../types/formTypes';
import { EditCard, Title } from '../pages/EditProfile/styles';
import { nameValidator, emailValidator } from '../utils/inputValidators';
import Loader from './Loader';

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

      if (uploadedProfile) {
        genDetails.profilePicture = uploadedProfile;
      }

      const response = await updateUser({ method: httpMethod.PATCH, data: genDetails });

      if (response?.status === 200) {
        userForm.resetFields();
        toast.success('User info updated');
        registerSession(response.data.accessToken);
      }
    },
    [updateUser, registerSession, userForm]
  );

  useEffect(() => {
    if (userData) {
      userForm.setFieldsValue({
        bio: userData.bio,
        email: userData.email,
        lastName: userData.lastName,
        firstName: userData.firstName,
        birthday: dayjs(userData.birthday, 'YYYY/MM/DD').add(1, 'day'),
      });
    }
  }, [userData, userForm]);

  if (!userData) {
    return <Loader />;
  }

  return (
    <EditCard bordered hoverable>
      <Title level={2}>General Information</Title>
      <Form form={userForm} onFinish={onSaveGeneralInfo}>
        <Row>
          <Column xs={24} sm={24} md={12}>
            <FileUploader
              id="profilePicture"
              form={userForm}
              disable={isFormLoading}
              preview={userData.firstName}
              defaultImg={userData.profilePicture}
            />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input label="Bio (Optional)" type="textarea" id="bio" disabled={isFormLoading} />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input
              id="firstName"
              label="First Name"
              disabled={isFormLoading}
              rules={nameValidator('First name')}
            />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input
              id="lastName"
              label="Last Name"
              disabled={isFormLoading}
              rules={nameValidator('Last name')}
            />
          </Column>
          <Column xs={24} sm={24} md={12}>
            <Input
              id="email"
              type="email"
              label="Email"
              rules={emailValidator}
              disabled={isFormLoading}
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
