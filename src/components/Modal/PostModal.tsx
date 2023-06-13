import { Form, FormInstance } from 'antd';
import { toast } from 'react-hot-toast';
import { useCallback, useEffect, useRef } from 'react';

import Modal from '.';
import Input from '../Input';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { PostDetail } from '../../types/formTypes';
import usePostModal from '../../hooks/usePostModal';

const PostForm = () => {
  const { addPost, updatePost, post } = usePost();
  const [form] = Form.useForm();
  const postModal = usePostModal();
  const formRef = useRef<FormInstance<PostDetail>>(null);

  const { refetch: managePost, isLoading } = useFetch({
    endpoint: `/post${postModal.isEdit ? `/${post?.id}` : ''}`,
    skipInitialInvocation: true,
  });

  const onPostSubmit = useCallback(
    async (postDetail: PostDetail) => {
      let postStateMessage;
      const postMethod = postModal.isEdit ? httpMethod.PATCH : httpMethod.POST;
      const resData = await managePost({ method: postMethod, data: postDetail });

      if (!resData) {
        return;
      }

      /* Post created */
      if (resData.status === 201) {
        addPost(resData.data);
        postStateMessage = 'created';
      }

      /* Update success */
      if (resData.status === 200 && post) {
        updatePost(post.id, postDetail.post);
        postStateMessage = 'updated';
      }

      form.resetFields();
      postModal.onClose();
      toast.success(`Post ${postStateMessage} successfully`);
    },
    [form, managePost, addPost, postModal, updatePost, post]
  );

  /**
   * Don't let the user close the modal while submitting
   * Also, clear the post field after closing the modal
   */
  const onCancel = () => {
    if (isLoading) return;

    postModal.onClose();
    // form.setFieldsValue({ post: '' });
  };

  /**
   * If the form is flagged for post edit
   * then set the initial post value to specified edit post
   */
  useEffect(() => {
    if (formRef.current) {
      form.setFieldsValue({ post: postModal.isEdit ? post?.post : '' });
    }
  }, [form, postModal.isEdit, post]);

  return (
    <>
      <Modal
        title={`${postModal.isEdit ? 'Edit' : 'Create'} post`}
        isOpen={postModal.isOpen}
        onCancel={onCancel}
        isLoading={isLoading}
        closable={false}
        onOk={form.submit}
      >
        <Form onFinish={onPostSubmit} form={form} ref={formRef}>
          <Input type="textarea" label="Post" id="post" disabled={isLoading} required />
        </Form>
      </Modal>
    </>
  );
};

export default PostForm;
