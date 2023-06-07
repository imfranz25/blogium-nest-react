import { Avatar as AntdAvatar, Button, Card, Typography, Divider as AntdDivider } from 'antd';
import styled from 'styled-components';

export const PostCard = styled(Card)`
  margin: 20px 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

export const AvatarContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const Avatar = styled(AntdAvatar)`
  margin-right: 18px;
  background-color: #87ceeb;
`;

export const UserContainer = styled.div`
  .ant-typography {
    padding: 0 !important;
    margin: 0 !important;
  }

  div {
    font-size: 12px;
    color: #9ca3af;
  }
`;

export const Paragraph = styled(Typography.Paragraph)`
  margin: 30px 0 0 0 !important;
`;

export const PostButton = styled(Button)`
  padding: 0 !important;
  margin: 0 !important;
  height: auto;
  margin-right: 12px !important;
  color: inherit;
`;

export const Divider = styled(AntdDivider)`
  margin: 15px 0;
`;
