export type SafeUser = {
  readonly userId: string;
  readonly profilePicture: string;
  readonly email: string;
  readonly fullName: string;
  readonly iat: number;
  readonly exp: number;
} | null;

export type SafePostUser = {
  id?: string;
  firstName: string;
  lastName: string;
  userId: string;
  profilePicture: string | null;
};

export type SafePostComment = {
  id: string;
  comment: string;
  User: SafePostUser;
  createdAt: string;
};

export type SafeLikePost = {
  id: string;
  postId: string;
  userId: string;
};

export type SafePost = SafeLikePost & {
  post: string;
  createdAt: string;
  User: SafePostUser;
  Like: SafeLikePost[];
  Comment: SafePostComment[];
};

export type SafeUserProfile = Omit<SafePostUser, 'userId'> & {
  bio: string;
  birthday: string;
  Post: SafePost[];
};

export type SafeError = {
  response: {
    status: number;
    data: {
      message: string | string[];
    };
  };
};

export type PostState = 'edit' | 'delete';
