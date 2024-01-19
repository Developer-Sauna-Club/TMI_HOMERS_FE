import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { checkAuthentication, signUp, login, logout } from '@/api/Auth';
import { TOAST_MESSAGES } from '@constants/Messages';
import { removeItemFromStorage, setItemToStorage } from '@utils/localStorage';
import { isEmptyUser } from '@utils/user';
import { useToastContext } from './useToastContext';

const useAuthQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const userQuery = useQuery(['user'], checkAuthentication, {
    staleTime: Infinity,
    onSuccess: (user) => {
      if (isEmptyUser(user)) {
        removeItemFromStorage('token');
      }
    },
    onError: () => {
      removeItemFromStorage('token');
      showToast(TOAST_MESSAGES.AUTH_USER_FAILED, 'error');
    },
  });

  const signUpQuery = useMutation(signUp, {
    onSuccess: ({ user, token }) => {
      queryClient.setQueryData(['user'], user);
      setItemToStorage('token', token);
      showToast(TOAST_MESSAGES.SIGNUP_SUCCESS, 'success');
      navigate('/home');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          showToast(TOAST_MESSAGES.SIGNUP_INVALID_EMAIL, 'error');
        }
      } else {
        showToast(TOAST_MESSAGES.SIGNUP_FAILED, 'error');
      }
    },
  });

  const loginQuery = useMutation(login, {
    onSuccess: ({ user, token }) => {
      queryClient.setQueryData(['user'], user);
      setItemToStorage('token', token);
      showToast(TOAST_MESSAGES.LOGIN_SUCCESS, 'success');
      navigate('/home');
    },
    onError: () => {
      showToast(TOAST_MESSAGES.LOGIN_FAILED, 'error');
    },
  });

  const EMPTY_USER = '';

  const logoutQuery = useMutation(logout, {
    onSuccess: () => {
      showToast(TOAST_MESSAGES.LOGOUT_SUCCESS, 'success');
      removeItemFromStorage('token');
      navigate('/home');
      queryClient.setQueryData(['user'], EMPTY_USER);
      queryClient.resetQueries();
    },
    onError: () => {
      showToast(TOAST_MESSAGES.LOGOUT_FAILED, 'error');
    },
  });

  return {
    userQuery,
    signUpQuery,
    loginQuery,
    logoutQuery,
  };
};

export default useAuthQuery;
