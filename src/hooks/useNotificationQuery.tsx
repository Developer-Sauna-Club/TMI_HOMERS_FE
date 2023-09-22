import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchNotifications,
  readNotifications as readNotice,
  createNotification as createNotice,
  NotificationParam,
} from '@/api/common/Notification';

const useNotificationQuery = (userId: string) => {
  const notificationQuery = useQuery(['notification', userId || ''], fetchNotifications, {
    enabled: !!userId,
  });
  const readNotifications = useMutation(readNotice);
  const createNotification = useMutation((notificationParam: NotificationParam) =>
    createNotice(notificationParam),
  );

  return { notificationQuery, readNotifications, createNotification };
};

export default useNotificationQuery;
