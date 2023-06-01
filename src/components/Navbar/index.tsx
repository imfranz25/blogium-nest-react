import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import Logo from './Logo';
import useAuth from '../../hooks/useAuth';
import Button from '../Button';

const Navbar = () => {
  const { user, onLogout } = useAuth();

  return (
    <div>
      <Logo />
      <ul>
        <Link to="/feed">Feed</Link>
        <Link to={`/profile/${user?.userId}`}>Profile</Link>
      </ul>
      <Avatar />
      <Button label="Logout" onClick={onLogout} />
    </div>
  );
};

export default Navbar;
