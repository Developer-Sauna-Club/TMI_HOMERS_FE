import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { removeItemFromStorage, setItemToStorage } from '@/utils/localStorage';
import { isEmptyUser } from '@/utils/user';
import { checkAuthentication, signUp, login, logout } from '@api/common/Auth';

const useAuthQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userQuery = useQuery(['user'], checkAuthentication, {
    staleTime: Infinity,
    onError: () => {
      removeItemFromStorage('token');
      alert('유저 정보를 받아오는데 실패했습니다');
    },
    onSuccess: (user) => {
      if (isEmptyUser(user)) {
        removeItemFromStorage('token');
      }
    },
  });

  const signUpQuery = useMutation(signUp, {
    onSuccess: ({ user, token }) => {
      alert('회원가입에 성공하셨습니다!');
      queryClient.setQueryData(['user'], user);
      setItemToStorage('token', token);
      navigate('/home');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          alert('중복된 이메일입니다');
        }
      } else {
        alert('회원가입에 실패하셨습니다.');
      }
    },
  });

  const loginQuery = useMutation(login, {
    onSuccess: ({ user, token }) => {
      alert('로그인에 성공하셨습니다!'); //TODO Toast 메세지로 성공 알리기?
      queryClient.setQueryData(['user'], user);
      setItemToStorage('token', token);
      navigate('/home');
    },
    onError: () => {
      alert('이메일과 비밀번호를 확인해주세요!');
    },
  });

  const EMTPY_USER = '';

  const logoutQuery = useMutation(logout, {
    onSuccess: () => {
      alert('로그아웃에 성공하셨습니다');
      removeItemFromStorage('token');
      navigate('/home');
      queryClient.setQueryData(['user'], EMTPY_USER);
    },
    onError: () => {
      alert('로그아웃에 실패하셨습니다');
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
