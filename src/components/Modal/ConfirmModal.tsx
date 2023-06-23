import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import Modal from '.';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import useDeleteModal from '../../hooks/useConfirmModal';

interface ConfirmModalProps {
  title?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ title = 'Confirm' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const deleteModal = useDeleteModal();
  const { removePost, post } = usePost();

  const { refetch: deletePost, isLoading } = useFetch({
    endpoint: `/post/${post?.id}`,
    skipInitialInvocation: true,
  });

  const onDeletePost = useCallback(async () => {
    const resData = await deletePost({ method: httpMethod.DELETE });

    if (!resData || !post) {
      return;
    }

    removePost(post.id);
    deleteModal.onClose();
    toast.success(`Post deleted successfully`);

    /* For post detail pages -> navigate to feed */
    const isInPostDetailPage = location.pathname.includes('/post/');

    if (isInPostDetailPage) {
      navigate('/feed');
    }
  }, [deleteModal, deletePost, removePost, post, location.pathname, navigate]);

  /* Don't let the user close the modal while submitting */
  const onCancel = () => {
    if (isLoading) return;

    deleteModal.onClose();
  };

  return (
    <>
      <Modal
        title={title}
        isOpen={deleteModal.isOpen}
        onCancel={onCancel}
        isLoading={isLoading}
        closable={false}
        onOk={onDeletePost}
      >
        {post?.post}
      </Modal>
    </>
  );
};

export default ConfirmModal;
