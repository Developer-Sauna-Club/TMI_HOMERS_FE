import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TOAST_MESSAGES } from '@/constants/Messages';
import { saveArticle } from '@api/saveArticle';
import { useToastContext } from './useToastContext';

export const useArticle = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const { mutate: createPost, isLoading } = useMutation(saveArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
      showToast(TOAST_MESSAGES.POST_SUCCESS, 'success');
      navigate('/news');
    },
    onError: () => {
      showToast(TOAST_MESSAGES.POST_FAILED, 'error');
    },
  });
  return { createPost, isLoading };
};
