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
      alert(JSON.stringify(user));
      setUser(user);
      setItemToStorage('token', token);
      navigate('/home');
    },
  });
  return { loginMutate, isLoading };
};

export default useLogin;
