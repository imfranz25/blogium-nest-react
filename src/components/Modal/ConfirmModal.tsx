import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import Modal from '.';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import useDeleteModal from '../../hooks/useConfirmModal';

const ConfirmModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const deleteModal = useDeleteModal();
  const { removePost, post } = usePost();

  const { refetch: deletePost, isLoading } = useFetch({
    endpoint: `/post/${post?.id}`,
    skipInitialInvocation: true,
  });

  const onDeletePost = useCallback(async () => {
    const response = await deletePost({ method: httpMethod.DELETE });

    /* Post deletion failed */
    if (response?.status !== 200 || !post) {
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
        closable={false}
        onCancel={onCancel}
        onOk={onDeletePost}
        isLoading={isLoading}
        isOpen={deleteModal.isOpen}
        title={`Are you sure you want to delete this post?`}
      >
        {post && post.post}
      </Modal>
    </>
  );
};

export default ConfirmModal;
