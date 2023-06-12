import { Form } from 'antd';
import { toast } from 'react-hot-toast';
import { useCallback, useEffect } from 'react';

import Modal from '.';
import Input from '../Input';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { PostDetail } from '../../types/formTypes';
import usePostModal from '../../hooks/usePostModal';

const PostForm = () => {
  const { addPost, post } = usePost();
  const [form] = Form.useForm();
  const postModal = usePostModal();

  const { refetch: managePost, isLoading } = useFetch({
    endpoint: `/post${postModal.isEdit ? `/${post?.id}` : ''}`,
    skipInitialInvocation: true,
  });

  const onPostSubmit = useCallback(
    async (postDetail: PostDetail) => {
      let postStateMessage;
      const postMethod = postModal.isEdit ? httpMethod.PATCH : httpMethod.POST;
      const resData = await managePost({ method: postMethod, data: postDetail });

      /* Update success */
      if (resData?.status === 200) {
        // addPost(resData.data);
        postStateMessage = 'updated';
      }

      /* Post created */
      if (resData?.status === 201) {
        addPost(resData.data);
        postStateMessage = 'created';
      }

      toast.success(`Post ${postStateMessage} successfully`);
      form.resetFields();
      postModal.onClose();
    },
    [form, managePost, addPost, postModal]
  );

  useEffect(() => {
    if (postModal.isEdit && post) {
      form.setFieldsValue({ post: post.post });
    }
  }, [form, postModal.isEdit, post]);

  return (
    <>
      <Modal
        isOpen={postModal.isOpen}
        onCancel={postModal.onClose}
        isLoading={isLoading}
        closable={false}
        onOk={form.submit}
      >
        <Form onFinish={onPostSubmit} form={form}>
          <Input type="textarea" label="Post" id="post" required />
        </Form>
      </Modal>
    </>
  );
};

export default PostForm;
