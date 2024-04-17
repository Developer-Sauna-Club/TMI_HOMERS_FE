import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/api/UserSettings';
import { TOAST_MESSAGES } from '@/constants/Messages';
import { useToastContext } from './useToastContext';

const useEditProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();
  const { mutate: editProfile, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries({
        queryKey: ['userInfo', user._id],
      });
      showToast(TOAST_MESSAGES.EDIT_PROFILE_SUCCESS, 'success');
      navigate(`/profile/${user._id}`);
    },
    onError: () => {
      showToast(TOAST_MESSAGES.EDIT_PROFILE_FAILED, 'error');
    },
  });
  return { editProfile, isPending };
};

export default useEditProfile;
