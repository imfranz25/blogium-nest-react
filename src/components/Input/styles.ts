import { Form, DatePicker as AntdDatePicker, Row, Avatar as AntdAvatar } from 'antd';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  margin-bottom: 3px;
`;

export const FormItem = styled(Form.Item)`
  label {
    height: auto !important;
  }

  .ant-form-item-explain {
    font-size: 12px;
  }
`;

export const DatePicker = styled(AntdDatePicker)`
  width: 100%;
`;

export const AvatarPreview = styled(Row)`
  width: 100%;
  margin-top: 25px;
`;

export const Avatar = styled(AntdAvatar)`
  border: 1px dashed rgba(0, 0, 0, 0.2);

  span {
    font-size: 34px;
  }
`;
