import { Avatar, Divider, Typography } from 'antd';
import styled from 'styled-components';

export const CommentDivider = styled(Divider)`
  padding: 0;
  margin: 0 0 15px 0;
`;

export const StyledAvatar = styled(Avatar)`
  background-color: #87ceeb;
`;

export const AvatarText = styled.span`
  padding: 8px;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;

export const StyledName = styled.span`
  font-size: 13px;
`;

export const StyledTime = styled.span`
  font-size: 11px;
  color: gray;
  margin-left: 2px;
`;

export const CommentContainer = styled.div`
  margin-left: 30px;
  display: inline-block;
  width: auto;
`;

export const CommentText = styled(Typography.Paragraph)`
  background-color: #f9fafb;
  padding: 5px 10px;
  border-radius: 0px 10px 6px 10px;
  border: rgba(0, 0, 0, 0.2) 1px solid;
  text-align: justify;
`;
