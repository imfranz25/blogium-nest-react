import { create } from 'zustand';

import { SafePost, SafePostComment } from '../types';

interface PostStore {
  post: SafePost | null;
  posts: SafePost[];
  setPost: (post: SafePost) => void;
  setPosts: (posts: SafePost[]) => void;
  addPost: (post: SafePost) => void;
  addComment: (postId: string, comment: SafePostComment) => void;
}

const usePost = create<PostStore>((set, get) => {
  const addComment = (postId: string, comment: SafePostComment) => {
    const updatedPosts = [...get().posts];
    const postIndex = updatedPosts.findIndex((post) => post.id === postId);
    const updatedPost = { ...updatedPosts[postIndex] };

    updatedPost.Comment.push(comment);
    updatedPosts[postIndex] = updatedPost;

    set({ posts: updatedPosts });
  };

  return {
    post: null,
    posts: [],
    setPost: (post) => set({ post }),
    setPosts: (posts) => set({ posts }),
    addPost: (post) => set({ posts: [post, ...get().posts] }),
    addComment,
  };
});

export default usePost;
