import { Button, MenuProps } from 'antd';
import { Link } from 'react-router-dom';

const postItems = (
  postId: string,
  isOwned: boolean,
  location: string,
  setPostState: (state: 'edit' | 'delete') => void
) => {
  const menuItems: MenuProps['items'] = [];

  if (location === '/feed') {
    menuItems.push({
      key: `view-${postId}`,
      label: <Link to={`/post/${postId}`}>View</Link>,
    });
  }

  if (isOwned) {
    menuItems.push({
      key: `edit-${postId}`,
      label: <span onClick={() => setPostState('edit')}>Edit</span>,
    });

    menuItems.push({
      key: `delete-${postId}`,
      danger: true,
      label: <span onClick={() => setPostState('delete')}>Delete</span>,
    });
  }

  return menuItems;
};

export default postItems;
