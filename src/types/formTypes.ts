export type Credentials = {
  email: string;
  password: string;
};

export type UserDetails = Credentials & {
  firstName: string;
  lastName: string;
  birthday: string;
  confirmPassword: string;
};

export type PostDetail = {
  post: string;
};

export type CommentDetail = {
  comment: string;
};
