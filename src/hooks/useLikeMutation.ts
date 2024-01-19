import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLikePost, likePost } from '@/api/Like';

export const useLikeCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: (like) => {
      queryClient.invalidateQueries(['article', like.post]);
      queryClient.invalidateQueries(['userInfo', like.user]);
      queryClient.invalidateQueries(['newestArticles']);
      queryClient.invalidateQueries(['articles']);
      queryClient.invalidateQueries(['likedArticles']);
      queryClient.invalidateQueries(['followingArticles']);
      queryClient.invalidateQueries(['user']);
    },
  });
};

export const useLikeDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLikePost,
    onSuccess: (like) => {
      queryClient.invalidateQueries(['article', like.post]);
      queryClient.invalidateQueries(['userInfo', like.user]);
      queryClient.invalidateQueries(['newestArticles']);
      queryClient.invalidateQueries(['articles']);
      queryClient.invalidateQueries(['likedArticles']);
      queryClient.invalidateQueries(['followingArticles']);
      queryClient.invalidateQueries(['user']);
    },
  });
};
