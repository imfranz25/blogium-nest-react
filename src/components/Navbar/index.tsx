import { Avatar, Dropdown, MenuProps, Image, Typography } from 'antd';
import blogiumLogo from '../../assets/logo.png';

import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Header, Link, BrandContainer, LinkContainer, AvatarContainer } from './styles';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, onLogout } = useAuth();

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={onLogout}>Logout</span>,
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
