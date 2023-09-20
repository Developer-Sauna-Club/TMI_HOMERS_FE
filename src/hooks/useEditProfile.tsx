import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '@/api/common/UserSettings';
import { TOAST_MESSAGES } from '@/constants/ToastMessages';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useToastContext } from '@/hooks/useToastContext';

const useEditProfile = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const { showToast } = useToastContext();

  const { mutate: editProfile, isLoading } = useMutation(updateUser, {
    onSuccess: (user) => {
      setUser(user);
      showToast(TOAST_MESSAGES.EDIT_PROFILE_SUCESS, 'success');
      navigate(`/profile/${user._id}`);
    },
    onError: () => {
      showToast(TOAST_MESSAGES.EDIT_PROFILE_FAILED, 'error');
    },
  });
  return { editProfile, isLoading };
};

export default useEditProfile;
