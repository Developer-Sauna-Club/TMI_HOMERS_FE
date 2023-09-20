import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { TOAST_MESSAGES } from '@/constants/ToastMessages';
import { signUp } from '@api/signUp';
import { setItemToStorage } from '@utils/localStorage';
import { useAuthContext } from './useAuthContext';
import { useToastContext } from './useToastContext';

const useSignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const { showToast } = useToastContext();

  const { mutate: signUpMutate, isLoading } = useMutation(signUp, {
    onSuccess: ({ user, token }) => {
      setUser(user);
      setItemToStorage('token', token);
      showToast(TOAST_MESSAGES.SIGNUP_SUCCESS, 'success');
      navigate('/home');
    },
    onError: () => {
      showToast(TOAST_MESSAGES.SIGNUP_FAILED, 'error');
    },
  });

  return { signUpMutate, isLoading };
};

export default useSignUp;
