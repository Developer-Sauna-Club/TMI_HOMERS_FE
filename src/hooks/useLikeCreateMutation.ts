import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost } from '@/api/common/Like';

export const useLikeCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: (like) =>
      Promise.all([
        queryClient.invalidateQueries(['article', like.post]),
        queryClient.invalidateQueries(['user']),
      ]),
  });
};
