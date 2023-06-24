import React from 'react';
import { Button, Row, Typography } from 'antd';
import usePostModal from '../hooks/usePostModal';

interface PostHeaderProps {
  label: string;
  isOWnProfile?: boolean;
}

const PostHeader: React.FC<PostHeaderProps> = ({ label, isOWnProfile = true }) => {
  const postModal = usePostModal();

  return (
    <Row justify="space-between" align="middle">
      <Typography.Title level={2} style={{ margin: 0 }}>
        {label}
      </Typography.Title>
      {isOWnProfile && (
        <Button onClick={() => postModal.onOpen()} type="primary">
          Create Post
        </Button>
      )}
    </Row>
  );
};

const MemoizedPostHeader = React.memo(PostHeader);

export default MemoizedPostHeader;
