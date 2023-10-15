import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveArticle } from '@api/saveArticle';
import { TOAST_MESSAGES } from '@constants/Messages';
import { useToastContext } from './useToastContext';

export const useCreateArticle = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const { mutate: createPost, isLoading } = useMutation(saveArticle, {
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(['newestArticles']),
        queryClient.invalidateQueries(['articles']),
        queryClient.invalidateQueries(['followingArticles']),
      ]);
      showToast(TOAST_MESSAGES.POST_SUCCESS, 'success');
      navigate('/news');
    },
    onError: () => {
      showToast(TOAST_MESSAGES.POST_FAILED, 'error');
    },
  });
  return { createPost, isLoading };
};
