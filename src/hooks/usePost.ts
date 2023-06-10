import { create } from 'zustand';

import { SafePost } from '../types';

interface PostStore {
  post: SafePost | null;
  posts: SafePost[];
  setPost: (post: SafePost) => void;
  setPosts: (posts: SafePost[]) => void;
  addPost: (post: SafePost) => void;
}

const usePost = create<PostStore>((set, get) => {
  return {
    post: null,
    posts: [],
    setPost: (post) => set({ post }),
    setPosts: (posts) => set({ posts }),
    addPost: (post) => set({ posts: [post, ...get().posts] }),
  };
});

export default usePost;
