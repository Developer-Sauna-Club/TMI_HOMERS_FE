import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/api/signUp';

const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate: signUpMutate, isLoading } = useMutation(signUp, {
    onSuccess: (data) => {
      // TODO: save the user in the state
      alert(JSON.stringify(data));
      navigate('/home');
    },
    onError: (error) => {
      alert(JSON.stringify(error));
    },
  });
  return { signUpMutate, isLoading };
};

export default useSignUp;
