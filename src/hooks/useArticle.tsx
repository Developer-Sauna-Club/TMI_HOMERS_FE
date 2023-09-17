import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveArticle } from '@api/saveArticle';

export const useArticle = () => {
  const queryClient = useQueryClient();

  return useMutation(saveArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(['search']);
    },
  });
};
