export type SafeUser = {
  userId: string;
  iat: number;
  exp: number;
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
  User: {
    profilePicture: string | null;
  };
};

export type SafeLikePost = {
  id: string;
  postId: string;
  userId: string;
};

export type SafePost = {
  id: string;
  post: string;
  userId: string;
  User: SafePostUser;
  Like: SafeLikePost[];
  Comment: SafePostComment[];
};
