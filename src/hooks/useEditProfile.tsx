import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '@/api/common/UserSettings';
import { useAuthContext } from '@/hooks/useAuthContext';

const useEditProfile = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const { mutate: editProfile, isLoading } = useMutation(updateUser, {
    onSuccess: (user) => {
      alert('회원정보가 수정되었습니다');
      setUser(user);
      navigate(`/profile/${user._id}`);
    },
    onError: (error) => {
      alert(JSON.stringify(error));
    },
  });
  return { editProfile, isLoading };
};

export default useEditProfile;
