import { Card, Col as AntdCol, Button as AntdButton } from 'antd';
import styled from 'styled-components';

export const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0px 100px 0px;
  background-color: #f9fafb;
`;

export const SignUpCard = styled(Card)`
  width: 550px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Column = styled(AntdCol)`
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

export const Button = styled(AntdButton)`
  margin: 0 5px;
  padding: 0;
`;
