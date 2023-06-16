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

export type GenDetails = {
  profilePicture: string;
  bio: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
};
