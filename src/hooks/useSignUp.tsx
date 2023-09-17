import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@api/signUp';
import { setItemToStorage } from '@utils/localStorage';
import { useAuthContext } from './useAuthContext';

const useSignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const { mutate: signUpMutate, isLoading } = useMutation(signUp, {
    onSuccess: ({ user, token }) => {
      alert('회원가입에 성공하셨습니다!');
      setUser(user);
      setItemToStorage('token', token);
      navigate('/home');
    },
    onError: (error) => {
      alert(JSON.stringify(error));
    },
  });

  return { signUpMutate, isLoading };
};

export default useSignUp;
