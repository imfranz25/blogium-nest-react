import { SafePostComment } from '../../types';

import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

interface CommentProps {
  postId: string;
  comments: SafePostComment[];
}
const Comments: React.FC<CommentProps> = ({ postId, comments }) => {
  return (
    <>
      <CommentForm postId={postId} />
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          user={comment.User}
          comment={comment.comment}
          timeCreated={comment.createdAt}
        />
      ))}
    </>
  );
};

export default Comments;
