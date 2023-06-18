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
        <Link to={`/post/${postId}`}>
          <Row align="middle">
            <FaRegEye style={marginRight} />
            View
          </Row>
        </Link>
      ),
    });
  }

  if (isOwned) {
    menuItems.push({
      key: `edit-${postId}`,
      style: { borderTop: menuItems.length > 0 ? borderTop : 0 },
      onClick: () => setPostState('edit'),
      label: (
        <Row align="middle">
          <FaEdit style={marginRight} />
          Edit
        </Row>
      ),
    });

    menuItems.push({
      key: `delete-${postId}`,
      danger: true,
      style: { borderTop },
      onClick: () => setPostState('delete'),
      label: (
        <Row align="middle">
          <FaTrashAlt style={marginRight} />
          Delete
        </Row>
      ),
    });
  }

  return menuItems;
};

export default postItems;
