import { Typography } from 'antd';
import styled from 'styled-components';

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
  margin-left: 5px;
`;

export const CommentContainer = styled.div`
  margin-left: 30px;
  display: inline-block;
  width: auto;
`;

export const CommentText = styled(Typography.Paragraph)`
  background-color: #f9fafb;
  padding: 5px 10px;
  border-radius: 6px;
  border: rgba(0, 0, 0, 0.1) 1px solid;
`;
