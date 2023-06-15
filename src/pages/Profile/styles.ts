import { Col, Row } from 'antd';
import styled from 'styled-components';
import { UserContainer as PostUserContainer } from '../../components/Post/styles';

export const ProfileContainer = styled(Row)`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background: white;
  padding: 30px;
  border-radius: 8px;
`;

export const NameLogo = styled.span`
  font-size: 35px;
`;

export const UserContainer = styled(PostUserContainer)`
  margin-left: 25px;

  @media (max-width: 480px) {
    margin-left: 0px;
  }
`;

export const UserRow = styled(Row)`
  @media (max-width: 480px) {
    justify-content: center;

    div {
      text-align: center;
    }
  }
`;

export const EditContainer = styled(Col)`
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: 800px) {
    margin-top: 30px;

    button {
      width: 100%;
    }
  }
`;
