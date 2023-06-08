import React, { useMemo } from 'react';
import { Button, Dropdown } from 'antd';
import { FaEllipsisH } from 'react-icons/fa';

import postItems from '../../utils/getPostMenu';
import { useLocation } from 'react-router-dom';

interface MenuProps {
  postId: string;
  isOwned: boolean;
}

const Menu: React.FC<MenuProps> = ({ postId, isOwned }) => {
  const location = useLocation();

  const postMenuItems = useMemo(
    () => postItems(postId, isOwned, location.pathname),
    [postId, isOwned, location.pathname]
  );

  return (
    <Dropdown menu={{ items: postMenuItems }} placement="bottomLeft">
      <Button>
        <FaEllipsisH />
      </Button>
    </Dropdown>
  );
};

export default Menu;
