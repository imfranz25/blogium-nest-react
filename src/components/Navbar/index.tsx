import { Avatar, Dropdown, MenuProps, Image } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import blogiumLogo from '../../assets/logo.png';

import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Header, Link, LogoContainer, LinkContainer, AvatarContainer } from './styles';

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
      <LogoContainer>
        <Image
          alt="Blogium"
          width={32}
          preview={false}
          src={blogiumLogo}
          onClick={() => navigate('/feed')}
        />
      </LogoContainer>
      <LinkContainer>
        <Link to="/feed">Feed</Link>
        <Link to={`/profile/${user?.userId}`}>Profile</Link>
      </LinkContainer>
      <AvatarContainer>
        <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
          <Avatar icon={<FaUserCircle size={32} />} />
        </Dropdown>
      </AvatarContainer>
    </Header>
  );
};

export default Navbar;
