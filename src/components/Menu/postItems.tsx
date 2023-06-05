import { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

const postItems = (postId: string, isOwned: boolean) => {
  const menuItems: MenuProps['items'] = [
    {
      key: `view-${postId}`,
      label: <Link to={`/post/${postId}`}>View</Link>,
    },
  ];

  if (isOwned) {
    menuItems.push({
      key: `edit-${postId}`,
      label: 'Edit',
    });

    menuItems.push({
      key: `delete-${postId}`,
      label: 'Delete',
      danger: true,
    });
  }

  return menuItems;
};

export default postItems;
