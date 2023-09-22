import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLikePost } from '@/api/common/Like';

export const useLikeDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLikePost,
    onSuccess: (like) =>
      Promise.all([
        queryClient.invalidateQueries(['article', like.post]),
        queryClient.invalidateQueries(['user']),
      ]),
  });
};
