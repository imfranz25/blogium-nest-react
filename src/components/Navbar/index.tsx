import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import Logo from './Logo';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div>
      <Logo />
      <ul>
        <Link to="/feed">Feed</Link>
        <Link to={`/profile/${user?.userId}`}>Profile</Link>
      </ul>
      <Avatar />
    </div>
  );
};

export default Navbar;
