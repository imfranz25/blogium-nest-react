import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, MenuProps, Image, Typography } from 'antd';

import blogiumLogo from '../../assets/logo.png';
import { Header, Link, BrandContainer, LinkContainer, AvatarContainer } from './styles';
import useUser from '../../hooks/useAuth';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const { clearSession, user } = useUser();

  const logOut = () => {
    clearSession();
    toast.success('Logged out');
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'userDetails',
      label: <span>{user?.email}</span>,
    },
    {
      key: 'logout',
      label: <span onClick={logOut}>Logout</span>,
    },
  ];

  return (
    <Header>
      <BrandContainer onClick={() => navigate('/feed')}>
        <Image alt="Blogium" width={32} preview={false} src={blogiumLogo} />
        <Typography.Text>Blogium</Typography.Text>
      </BrandContainer>
      <LinkContainer>
        <Link to="/feed">Feed</Link>
        <Link to={`/profile/${user?.userId}`}>Profile</Link>
      </LinkContainer>
      <AvatarContainer>
        <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
          <Avatar size="large" src={user?.fullName}>
            {user?.fullName[0]?.toUpperCase()}
          </Avatar>
        </Dropdown>
      </AvatarContainer>
    </Header>
  );
};

export default Navbar;
