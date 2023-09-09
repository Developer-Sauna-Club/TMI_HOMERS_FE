import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/api/signUp';
import { setItemToStorage } from '@/utils/localStorage';
import { useAuthContext } from './useAuthContext';

const useSignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const { mutate: signUpMutate, isLoading } = useMutation(signUp, {
    onSuccess: ({ user, token }) => {
      // TODO: save the user in the state
      alert(JSON.stringify(user));
      setUser(user);
      setItemToStorage('token', token);
      navigate('/home');
    },
  });
  return { signUpMutate, isLoading };
};

export default useSignUp;
