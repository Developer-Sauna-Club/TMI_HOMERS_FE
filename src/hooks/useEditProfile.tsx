import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/api/common/UserSettings';
import { TOAST_MESSAGES } from '@/constants/Messages';
import { useToastContext } from './useToastContext';

const useEditProfile = () => {
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

export default useEditProfile;
