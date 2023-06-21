import { Card, Typography } from 'antd';
import styled from 'styled-components';

export const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 20px;
  background-color: #f9fafb;
`;

export const EditCard = styled(Card)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

export const Title = styled(Typography.Title)`
  margin: 0;
`;
