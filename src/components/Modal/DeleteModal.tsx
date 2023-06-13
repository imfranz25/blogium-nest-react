import { toast } from 'react-hot-toast';
import { useCallback } from 'react';

import Modal from '.';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import useDeleteModal from '../../hooks/useDeleteModal';

const PostForm = () => {
  const deleteModal = useDeleteModal();
  const { removePost, post } = usePost();

  const { refetch: deletePost, isLoading } = useFetch({
    endpoint: `/post/${post?.id}`,
    skipInitialInvocation: true,
  });

  const onDeletePost = useCallback(async () => {
    const resData = await deletePost({ method: httpMethod.DELETE });

    if (resData && post) {
      removePost(post.id);
      deleteModal.onClose();
      toast.success(`Post deleted successfully`);
    }
  }, [deleteModal, deletePost, removePost, post]);

  return (
    <>
      <Modal
        title={`Are you sure you want to delete this post?`}
        isOpen={deleteModal.isOpen}
        onCancel={deleteModal.onClose}
        isLoading={isLoading}
        closable={false}
        onOk={onDeletePost}
      >
        {post?.post}
      </Modal>
    </>
  );
};

export default PostForm;
