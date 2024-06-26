import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchNotifications,
  readNotifications as readNotice,
  createNotification as createNotice,
  NotificationParam,
} from '@/api/Notification';
import type { Notification } from '@/type/Notification';

const useNotificationQuery = (userId?: string) => {
  const queryClient = useQueryClient();
  const notificationQuery = useQuery({
    queryKey: ['notification', userId || ''],
    queryFn: fetchNotifications,
    enabled: !!userId,
    refetchInterval: 1000 * 5,
  });
  const readNotifications = useMutation({
    mutationFn: readNotice,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['notification', userId],
      });
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
      queryClient.invalidateQueries({
        queryKey: ['notification', userId],
      });
    },
  });
  const createNotification = useMutation({
    mutationFn: (notificationParam: NotificationParam) => createNotice(notificationParam),
  });

  const unseenNotifications = notificationQuery.data?.filter(({ seen }) => !seen).length;

  return { notificationQuery, readNotifications, createNotification, unseenNotifications };
};

export default useNotificationQuery;
