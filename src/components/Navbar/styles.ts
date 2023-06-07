import styled from 'styled-components';
import { Layout } from 'antd';
import { Link as RouterLink } from 'react-router-dom';

export const cursorPointer = {
  cursor: 'pointer',
};

export const Header = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

export const Link = styled(RouterLink)`
  padding: 0 10px;
  font-size: 16px;
`;

export const LogoContainer = styled.div`
  cursor: pointer;

  @media (max-width: 500px) {
    display: none;
  }
`;

export const LinkContainer = styled.div`
  min-width: 120px;
`;
