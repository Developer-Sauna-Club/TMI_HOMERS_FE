import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@type/User';
import { followUser, unFollowUser } from '@/api/Follow';
import { createNotification } from '@/api/Notification';
import { TOAST_MESSAGES } from '@constants/Messages';
import { useToastContext } from './useToastContext';

const useFollowQuery = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const followMutation = useMutation({
    mutationFn: followUser,
    onMutate: async (id) => {
      queryClient.cancelQueries({
        queryKey: ['user'],
      });
      const preData = queryClient.getQueryData<User>(['user']);
      if (!preData) {
        return;
      }
      const modifyData = [...preData.following, { user: id }];
      queryClient.setQueryData(['user'], { ...preData, following: modifyData });
      return preData;
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(['user'], context);
      }
      showToast(TOAST_MESSAGES.FOLLOW_FAILED, 'error');
    },
    onSettled: (data) => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['user'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['userInfo', data?.user],
        }),
        queryClient.invalidateQueries({
          queryKey: ['followingArticles'],
        }),
      ]);
    },
    onSuccess: (data) => {
      showToast(TOAST_MESSAGES.FOLLOW_SUCCESS, 'success');
      createNotification({
        notificationTypeId: data._id,
        notificationType: 'FOLLOW',
        userId: data.user,
        postId: null,
      });
    },
  });

  const unFollowMutation = useMutation({
    mutationFn: unFollowUser,
    onMutate: async (id) => {
      queryClient.cancelQueries({
        queryKey: ['user'],
      });
      const preData = queryClient.getQueryData<User>(['user']);
      if (!preData) {
        return;
      }
      const modifyData = preData.following.filter(({ _id }) => _id !== id);
      queryClient.setQueryData(['user'], { ...preData, following: modifyData });
      return preData;
    },
    onError: (_, __, context) => {
      showToast(TOAST_MESSAGES.UN_FOLLOW_FAILED, 'error');
      if (context) {
        queryClient.setQueryData(['user'], context);
      }
    },
    onSettled: (data) => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['user'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['userInfo', data?.user],
        }),
        queryClient.invalidateQueries({
          queryKey: ['followingArticles'],
        }),
      ]);
    },
    onSuccess: () => {
      showToast(TOAST_MESSAGES.UN_FOLLOW_SUCCESS, 'success');
    },
  });

  return {
    followMutation,
    unFollowMutation,
  };
};
export default useFollowQuery;
