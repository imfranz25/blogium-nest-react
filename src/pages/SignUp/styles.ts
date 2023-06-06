import { Card, Col } from 'antd';
import styled from 'styled-components';

export const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 20px;
  background-color: #f9fafb;
`;

export const SignUpCard = styled(Card)`
  width: 550px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const InputCol = styled(Col)`
  padding: 0 8px;
`;

export const ActionWrapper = styled.div`
  margin: 25px 0 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .ant-btn {
    width: 100%;
  }
`;
