import styled from 'styled-components';
import { Layout } from 'antd';
import { Link as RouterLink } from 'react-router-dom';

export const MenuStyle = { borderBottom: '1px solid rgba(0,0,0,.1)' };

export const Header = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 1;

  @media (min-width: 900px) {
    padding: 0 200px;
  }
`;

export const Link = styled(RouterLink)`
  padding: 0 10px;
  font-size: 16px;
`;

export const BrandContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-left: 8px;
    font-size: 22px;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

export const LinkContainer = styled.div`
  min-width: 120px;
`;

export const AvatarContainer = styled.div`
  cursor: pointer;

  .ant-avatar {
    background-color: #87ceeb;
  }
`;

export const UserInfo = styled.div`
  display: block;

  & span {
    display: block;
  }
`;
