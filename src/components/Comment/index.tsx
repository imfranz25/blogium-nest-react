import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import { SafePostComment } from '../../types';

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
          id={comment.id}
          postId={postId}
          user={comment.User}
          comment={comment.comment}
          timeCreated={comment.createdAt}
        />
      ))}
    </>
  );
};

export default Comments;
