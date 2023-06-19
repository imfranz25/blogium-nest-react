import { create } from 'zustand';

import { SafePost, SafePostComment, SafeLikePost } from '../types';

interface PostStore {
  post: SafePost | null;
  posts: SafePost[];
  setPost: (post: SafePost) => void;
  addPost: (post: SafePost) => void;
  setPosts: (posts: SafePost[]) => void;
  removePost: (postId: string) => void;
  updatePost: (postId: string, post: string) => void;
  addComment: (postId: string, comment: SafePostComment) => void;
  updateLikePost: (postId: string, userId: string, likeData: SafeLikePost) => void;
}

const usePost = create<PostStore>((set, get) => {
  const updatePost = (postId: string, post: string) => {
    const updatedPosts = get().posts;
    const postIndex = updatedPosts.findIndex((post) => post.id === postId);

    updatedPosts[postIndex].post = post;

    set({ posts: updatedPosts });
  };

  const addComment = (postId: string, comment: SafePostComment) => {
    const updatedPosts = get().posts;
    const postIndex = updatedPosts.findIndex((post) => post.id === postId);
    const updatedPost = updatedPosts[postIndex];

    updatedPost.Comment.push(comment);
    updatedPosts[postIndex] = updatedPost;

    set({ posts: updatedPosts });
  };

  const updateLikePost = (postId: string, userId: string, likeData: SafeLikePost) => {
    const updatedPosts = get().posts;
    const postIndex = updatedPosts.findIndex((post) => post.id === postId);
    const updatedPost = updatedPosts[postIndex];
    const likeIndex = updatedPost.Like.findIndex((like) => like.userId === userId);

    if (likeIndex > -1) {
      updatedPost.Like.splice(likeIndex, 1);
    } else {
      updatedPost.Like.push(likeData);
    }

    updatedPosts[postIndex] = updatedPost;

    set({ posts: updatedPosts });
  };

  const removePost = (postId: string) => {
    const filteredPost = get().posts.filter((post) => post.id !== postId);

    set({ posts: filteredPost });
  };

  return {
    post: null,
    posts: [],
    updatePost,
    addComment,
    removePost,
    updateLikePost,
    setPost: (post) => set({ post }),
    setPosts: (posts) => set({ posts }),
    addPost: (post) => set({ posts: [post, ...get().posts] }),
  };
});

export default usePost;
