import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '@api/common/UserSettings';

const useChangePassword = () => {
  const navigate = useNavigate();
  const { mutate: changePasswordMutate, isLoading } = useMutation(updatePassword, {
    onSuccess: () => {
      alert('비밀번호가 성공적으로 변경되었습니다.');
      navigate(-1);
    },
    onError: (error) => {
      alert(JSON.stringify(error));
    },
  });

  return { changePasswordMutate, isLoading };
};

export default useChangePassword;
