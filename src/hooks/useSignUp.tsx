import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/api/signUp';
import { setItemToStorage } from '@/utils/localStorage';
import useAuthContext from './useAuthContext';

const useSignUp = () => {
  const { setUser } = useAuthContext();
  const { mutate, isLoading } = useMutation(signUp, {
    onSuccess: ({ user, token }) => {
      setUser(user); // context로 전역적으로 유저 정보 저장
      setItemToStorage('token', token); // 토큰 로컬에 저장
    },
  });

  return { mutate, isLoading };
};

export default useSignUp;
