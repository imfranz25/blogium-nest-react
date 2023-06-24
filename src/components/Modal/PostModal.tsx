import { toast } from 'react-hot-toast';
import { Form, FormInstance } from 'antd';
import { useCallback, useEffect, useRef } from 'react';

import Modal from '.';
import Input from '../Input';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { PostDetail } from '../../types/formTypes';
import usePostModal from '../../hooks/usePostModal';
import { requiredField } from '../../utils/inputValidators';

const PostForm = () => {
  const [form] = Form.useForm();
  const postModal = usePostModal();
  const { addPost, updatePost, post } = usePost();
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

  /* Don't let the user close the modal while submitting */
  const onCancel = () => {
    if (isLoading) return;

    postModal.onClose();
  };

  /**
   * If the form is flagged for post edit
   * then set the initial post value to target post
   */
  useEffect(() => {
    if (formRef.current) {
      form.setFieldsValue({ post: postModal.isEdit ? post?.post : '' });
    }
  }, [form, postModal.isEdit, post]);

  return (
    <>
      <Modal
        closable={false}
        onOk={form.submit}
        onCancel={onCancel}
        isLoading={isLoading}
        isOpen={postModal.isOpen}
        title={`${postModal.isEdit ? 'Edit' : 'Create'} post`}
      >
        <Form onFinish={onPostSubmit} form={form} ref={formRef}>
          <Input
            id="post"
            label="Post"
            type="textarea"
            disabled={isLoading}
            rules={requiredField('Post')}
          />
        </Form>
      </Modal>
    </>
  );
};

export default PostForm;
