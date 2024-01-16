import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '@/api/Post';
import { updateUser } from '@/api/UserSettings';
import { TOAST_MESSAGES } from '@constants/Messages';
import { useToastContext } from './useToastContext';

export const useEditProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const { mutate: editProfile, isLoading } = useMutation(updateUser, {
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      showToast(TOAST_MESSAGES.EDIT_PROFILE_SUCCESS, 'success');
      navigate(`/profile/${user._id}`);
    },
    onError: () => {
      showToast(TOAST_MESSAGES.EDIT_PROFILE_FAILED, 'error');
    },
  });
  return { editProfile, isLoading };
};

export const useEditPost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const { mutate: editPost, isLoading } = useMutation(updatePost, {
    onSuccess: (post) => {
      Promise.all([
        queryClient.invalidateQueries(['newestArticles']),
        queryClient.invalidateQueries(['articles']),
        queryClient.invalidateQueries(['followingArticles']),
      ]);
      showToast(TOAST_MESSAGES.EDIT_POST_SUCCESS, 'success');
      navigate(`/news/${post._id}`);
    },
    onError: () => {
      showToast(TOAST_MESSAGES.EDIT_POST_FAILED, 'error');
    },
  });
  return { editPost, isLoading };
};
