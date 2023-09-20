import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { TOAST_MESSAGES } from '@/constants/ToastMessages';
import { login } from '@api/login';
import { setItemToStorage } from '@utils/localStorage';
import { useAuthContext } from './useAuthContext';
import { useToastContext } from './useToastContext';

const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const { showToast } = useToastContext();

  const { mutate: loginMutate, isLoading } = useMutation(login, {
    onSuccess: ({ user, token }) => {
      setUser(user);
      setItemToStorage('token', token);
      showToast(TOAST_MESSAGES.LOGIN_SUCCESS, 'success');
      navigate('/home');
    },
    onError: () => {
      showToast(TOAST_MESSAGES.LOGIN_FAILED, 'error');
    },
  });
  return { loginMutate, isLoading };
};

export default useLogin;
