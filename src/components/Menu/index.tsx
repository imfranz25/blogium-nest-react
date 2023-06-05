import React from 'react';
import { Button, Dropdown } from 'antd';
import { FaEllipsisH } from 'react-icons/fa';

import postItems from './postItems';
import { useLocation } from 'react-router-dom';

interface MenuProps {
  postId: string;
  isOwned: boolean;
}

const Menu: React.FC<MenuProps> = ({ postId, isOwned }) => {
  const location = useLocation();

  return (
    <Dropdown menu={{ items: postItems(postId, isOwned, location) }} placement="bottomLeft">
      <Button>
        <FaEllipsisH />
      </Button>
    </Dropdown>
  );
};

export default Menu;
