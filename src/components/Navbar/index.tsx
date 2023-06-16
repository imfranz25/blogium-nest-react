import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, MenuProps, Image, Typography } from 'antd';

import useAuth from '../../hooks/useAuth';
import blogiumLogo from '../../assets/logo.png';
import {
  Header,
  Link,
  BrandContainer,
  LinkContainer,
  AvatarContainer,
  UserInfo,
  MenuStyle,
} from './styles';

const Navbar = () => {
  const navigate = useNavigate();
  const { clearSession, user } = useAuth();
  const menuItems: MenuProps['items'] = [];

  const logOut = () => {
    clearSession();
    toast.success('Logged out');
  };

  if (user) {
    menuItems.push(
      {
        key: 'userDetails',
        label: (
          <UserInfo>
            <span>
              {user.firstName} {user.lastName}
            </span>
            {user.email}
          </UserInfo>
        ),
        style: MenuStyle,
        onClick: () => navigate(`/profile/${user.userId}`),
      },
      {
        key: 'logout',
        label: 'Logout',
        onClick: logOut,
      }
    );
  }

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
          <Avatar size="large" src={user?.firstName}>
            {user?.firstName ? user.firstName[0].toUpperCase() : '?'}
          </Avatar>
        </Dropdown>
      </AvatarContainer>
    </Header>
  );
};

export default Navbar;
