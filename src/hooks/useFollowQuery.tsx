import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { followUser, unFollowUser } from '@/api/common/Follow';
const useFollowQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const followMutation = useMutation(followUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      // TODO : 팔로우 알람 보내기
      // createNotification({
      //   notificationTypeId: data._id,
      //   notificationType: 'FOLLOW',
      //   userId: data.user,
      //   postId: null,
      // });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          const userConfirmed = confirm('로그인이 필요한 작업입니다. 로그인하시겠습니까?');
          if (userConfirmed) {
            navigate('/login');
          }
        }
      }
    },
  });

  const unFollowMutation = useMutation(unFollowUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });

  return {
    followMutation,
    unFollowMutation,
  };
};
export default useFollowQuery;
