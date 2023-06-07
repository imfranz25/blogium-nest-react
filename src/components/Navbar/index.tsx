import { Link } from 'react-router-dom';

import Logo from './Logo';
import useAuth from '../../hooks/useAuth';
import { Avatar, Button, Row } from 'antd';

import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, onLogout } = useAuth();

  return (
    <Row justify="space-between">
      <Logo />
      <ul>
        <Link to="/feed">Feed</Link>
        <Link to={`/profile/${user?.userId}`}>Profile</Link>
      </ul>
      <Avatar icon={<FaUserCircle />} />
      <Button onClick={onLogout}>Logout</Button>
    </Row>
  );
};

export default Navbar;
