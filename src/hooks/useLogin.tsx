import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from '@api/login';
import { setItemToStorage } from '@utils/localStorage';
import { useAuthContext } from './useAuthContext';

const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const { mutate: loginMutate, isLoading } = useMutation(login, {
    onSuccess: ({ user, token }) => {
      alert(JSON.stringify(user)); //TODO Toast 메세지로 성공 알리기?
      setUser(user);
      setItemToStorage('token', token);
      navigate('/home');
    },
    onError: () => {
      alert('이메일과 비밀번호를 확인해주세요!');
    },
  });
  return { loginMutate, isLoading };
};

export default useLogin;
