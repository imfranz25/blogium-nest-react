export type SafeUser = {
  readonly userId: string;
  readonly iat: number;
  readonly exp: number;
} | null;

export type SafePostUser = {
  firstName: string;
  lastName: string;
  userId: string;
  profilePicture: string | null;
};

export type SafePostComment = {
  id: string;
  comment: string;
  User: Pick<SafePostUser, 'profilePicture'>;
};

export type SafeLikePost = {
  id: string;
  postId: string;
  userId: string;
};

export type SafePost = SafeLikePost & {
  post: string;
  User: SafePostUser;
  Like: SafeLikePost[];
  Comment: SafePostComment[];
};
