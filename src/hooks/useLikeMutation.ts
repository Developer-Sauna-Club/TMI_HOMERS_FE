import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLikePost, likePost } from '@/api/common/Like';

export const useLikeCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: (like) =>
      Promise.allSettled([
        queryClient.invalidateQueries(['article', like.post]),
        queryClient.invalidateQueries(['newestArticles']),
        queryClient.invalidateQueries(['articles']),
        queryClient.invalidateQueries(['followingArticles', like._id]),
        queryClient.invalidateQueries(['user']),
      ]),
  });
};

export const useLikeDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLikePost,
    onSuccess: (like) =>
      Promise.allSettled([
        queryClient.invalidateQueries(['article', like.post]),
        queryClient.invalidateQueries(['newestArticles']),
        queryClient.invalidateQueries(['articles']),
        queryClient.invalidateQueries(['followingArticles', like._id]),
        queryClient.invalidateQueries(['user']),
      ]),
  });
};
