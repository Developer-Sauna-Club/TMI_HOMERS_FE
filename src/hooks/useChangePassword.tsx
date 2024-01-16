import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '@/api/UserSettings';
import { TOAST_MESSAGES } from '@/constants/Messages';
import { useToastContext } from './useToastContext';

const useChangePassword = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { mutate: changePasswordMutate, isLoading } = useMutation(updatePassword, {
    onSuccess: () => {
      showToast(TOAST_MESSAGES.CHANGE_PASSWORD_SUCCESS, 'success');
      navigate('/home', { replace: true });
    },
    onError: () => {
      showToast(TOAST_MESSAGES.CHANGE_PASSWORD_FAILED, 'error');
    },
  });

  return { changePasswordMutate, isLoading };
};

export default useChangePassword;
