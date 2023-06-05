import React from 'react';
import { Button, Dropdown } from 'antd';
import { FaEllipsisH } from 'react-icons/fa';

import postItems from './postItems';

interface MenuProps {
  postId: string;
  isOwned: boolean;
}

const Menu: React.FC<MenuProps> = ({ postId, isOwned }) => {
  return (
    <Dropdown menu={{ items: postItems(postId, isOwned) }} placement="bottomLeft">
      <Button>
        <FaEllipsisH />
      </Button>
    </Dropdown>
  );
};

export default Menu;
