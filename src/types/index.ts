export type SafeUser = {
  userId: string;
  iat: number;
  exp: number;
} | null;

export type SafePost = {
  id: string;
  post: string;
};
