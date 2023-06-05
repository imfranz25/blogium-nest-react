import { Card } from 'antd';
import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 20px;
  background-color: #f9fafb;
`;

export const LoginCard = styled(Card)`
  width: 40%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
