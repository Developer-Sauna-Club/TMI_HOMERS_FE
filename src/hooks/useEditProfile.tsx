import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/api/common/UserSettings';

const useEditProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: editProfile, isLoading } = useMutation(updateUser, {
    onSuccess: (user) => {
      alert('회원정보가 수정되었습니다');
      queryClient.setQueryData(['user'], user);
      navigate(`/profile/${user._id}`);
    },
    onError: () => {
      alert('비밀번호 변경에 실패하셨습니다');
    },
  });
  return { editProfile, isLoading };
};

export default useEditProfile;
