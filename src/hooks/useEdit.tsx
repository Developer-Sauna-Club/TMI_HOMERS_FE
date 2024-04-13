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

  const { mutate: editProfile, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      showToast(TOAST_MESSAGES.EDIT_PROFILE_SUCCESS, 'success');
      navigate(`/profile/${user._id}`);
    },
    onError: () => {
      showToast(TOAST_MESSAGES.EDIT_PROFILE_FAILED, 'error');
    },
  });
  return { editProfile, isPending };
};

export const useEditPost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const { mutate: editPost, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: (post) => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['newestArticles'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['articles'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['followingArticles'],
        }),
      ]);
      showToast(TOAST_MESSAGES.EDIT_POST_SUCCESS, 'success');
      navigate(`/news/${post._id}`);
    },
    onError: () => {
      showToast(TOAST_MESSAGES.EDIT_POST_FAILED, 'error');
    },
  });
  return { editPost, isPending };
};
