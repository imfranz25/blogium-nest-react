import { MenuProps, Row } from 'antd';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit, FaRegEye } from 'react-icons/fa';

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
      label: (
        <Row align="middle">
          <FaRegEye style={{ marginRight: '5px' }} />
          <Link to={`/post/${postId}`} style={{ color: 'black' }}>
            View
          </Link>
        </Row>
      ),
    });
  }

  if (isOwned) {
    menuItems.push({
      key: `edit-${postId}`,
      label: (
        <Row align="middle">
          <FaEdit style={{ marginRight: '5px' }} />
          Edit
        </Row>
      ),
      onClick: () => setPostState('edit'),
    });

    menuItems.push({
      key: `delete-${postId}`,
      danger: true,
      label: (
        <Row align="middle">
          <FaTrashAlt style={{ marginRight: '5px' }} />
          Delete
        </Row>
      ),
      onClick: () => setPostState('delete'),
    });
  }

  return menuItems;
};

export default postItems;
