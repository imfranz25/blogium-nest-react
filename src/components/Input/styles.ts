import { Form } from 'antd';
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
