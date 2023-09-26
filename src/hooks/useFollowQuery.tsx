import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@type/User';
import { followUser, unFollowUser } from '@api/common/Follow';
import { createNotification } from '@api/common/Notification';
const useFollowQuery = () => {
  const queryClient = useQueryClient();

  const followMutation = useMutation(followUser, {
    onMutate: async (id) => {
      queryClient.cancelQueries(['user']);
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
    },
    onSettled: () => {
      Promise.all([
        queryClient.invalidateQueries(['user']),
        queryClient.invalidateQueries(['followingArticles']),
      ]);
    },
    onSuccess: (data) => {
      createNotification({
        notificationTypeId: data._id,
        notificationType: 'FOLLOW',
        userId: data.user,
        postId: null,
      });
    },
  });

  const unFollowMutation = useMutation(unFollowUser, {
    onMutate: async (id) => {
      queryClient.cancelQueries(['user']);
      const preData = queryClient.getQueryData<User>(['user']);
      if (!preData) {
        return;
      }
      const modifyData = preData.following.filter(({ _id }) => _id !== id);
      queryClient.setQueryData(['user'], { ...preData, following: modifyData });
      return preData;
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(['user'], context);
      }
    },
    onSettled: () => {
      Promise.all([
        queryClient.invalidateQueries(['user']),
        queryClient.invalidateQueries(['followingArticles']),
      ]);
    },
  });

  return {
    followMutation,
    unFollowMutation,
  };
};
export default useFollowQuery;
