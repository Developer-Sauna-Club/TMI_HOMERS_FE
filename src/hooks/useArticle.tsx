import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveArticle } from '@api/saveArticle';

export const useArticle = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(saveArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(['search']);
      navigate('/news');
    },
  });
};
