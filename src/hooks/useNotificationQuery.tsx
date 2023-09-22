import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchNotifications,
  readNotifications as readNotice,
  createNotification as createNotice,
  NotificationParam,
} from '@/api/common/Notification';
import type { Notification } from '@/type/Notification';

const useNotificationQuery = (userId?: string) => {
  const queryClient = useQueryClient();
  const notificationQuery = useQuery(['notification', userId || ''], fetchNotifications, {
    enabled: !!userId,
    refetchInterval: 1000 * 5,
  });
  const readNotifications = useMutation(readNotice, {
    onMutate: async () => {
      await queryClient.cancelQueries(['notification', userId]);
      const previousNotifications = queryClient.getQueryData<Notification[]>([
        'notification',
        userId,
      ]);
      if (!previousNotifications) {
        return;
      }
      const newNotifications = previousNotifications.map((notification) => {
        return { ...notification, seen: true };
      });
      queryClient.setQueryData(['notification', userId], newNotifications);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['notification', userId]);
    },
  });
  const createNotification = useMutation((notificationParam: NotificationParam) =>
    createNotice(notificationParam),
  );

  return { notificationQuery, readNotifications, createNotification };
};

export default useNotificationQuery;
