import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLikePost, likePost } from '@/api/Like';

export const useLikeCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: (like) => {
      queryClient.invalidateQueries({
        queryKey: ['article', like.post]
      });
      queryClient.invalidateQueries({
        queryKey: ['userInfo', like.user]
      });
      queryClient.invalidateQueries({
        queryKey: ['newestArticles']
      });
      queryClient.invalidateQueries({
        queryKey: ['articles']
      });
      queryClient.invalidateQueries({
        queryKey: ['likedArticles']
      });
      queryClient.invalidateQueries({
        queryKey: ['followingArticles']
      });
      queryClient.invalidateQueries({
        queryKey: ['user']
      });
    },
  });
};

export const useLikeDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLikePost,
    onSuccess: (like) => {
      queryClient.invalidateQueries({
        queryKey: ['article', like.post]
      });
      queryClient.invalidateQueries({
        queryKey: ['userInfo', like.user]
      });
      queryClient.invalidateQueries({
        queryKey: ['newestArticles']
      });
      queryClient.invalidateQueries({
        queryKey: ['articles']
      });
      queryClient.invalidateQueries({
        queryKey: ['likedArticles']
      });
      queryClient.invalidateQueries({
        queryKey: ['followingArticles']
      });
      queryClient.invalidateQueries({
        queryKey: ['user']
      });
    },
  });
};
