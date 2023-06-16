import { MenuProps, Row } from 'antd';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit, FaRegEye } from 'react-icons/fa';

const postItems = (
  postId: string,
  isOwned: boolean,
  location: string,
  setPostState: (state: 'edit' | 'delete') => void
) => {
  const marginRight = { marginRight: '5px' };
  const borderTop = '1px solid rgba(0,0,0,.1)';
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
          <FaEdit style={marginRight} />
          Edit
        </Row>
      ),
      onClick: () => setPostState('edit'),
      style: { borderTop: menuItems.length > 0 ? borderTop : 0 },
    });

    menuItems.push({
      key: `delete-${postId}`,
      danger: true,
      label: (
        <Row align="middle">
          <FaTrashAlt style={marginRight} />
          Delete
        </Row>
      ),
      onClick: () => setPostState('delete'),
      style: { borderTop },
    });
  }

  return menuItems;
};

export default postItems;
