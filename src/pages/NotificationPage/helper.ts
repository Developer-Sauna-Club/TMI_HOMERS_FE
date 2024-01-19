import type { NotificationType } from '@/api/Notification';
import type { Notification } from '@/type/Notification';

type NoticeMessage = {
  [key in NotificationType]: string;
};

const NOTICE_MESSAGE: NoticeMessage = {
  LIKE: '님이 회원님의 뉴스를 응원합니다',
  COMMENT: '님이 회원님의 뉴스에 댓글을 달았습니다',
  FOLLOW: '님이 회원님을 구독합니다',
};

interface GetMessageType {
  (args: Partial<Notification>): NotificationType;
}

const getMessageType: GetMessageType = ({ user, follow, comment }) => {
  if (follow !== undefined) {
    return 'FOLLOW';
  }
  if (comment !== undefined) {
    return 'COMMENT';
  }
  if (user !== undefined) {
    return 'LIKE';
  }
  throw new Error('잘못된 알림 타입입니다');
};

export const getNotificationMessage = ({
  author,
  user,
  follow,
  comment,
}: Partial<Notification>) => {
  const notificationType = getMessageType({ user, follow, comment });

  const nickname = author!.fullName as string;

  return `${nickname}${NOTICE_MESSAGE[notificationType]}`;
};

export const getNotificationUrl = (notification: Notification) => {
  const NOTIFICATION_URL = {
    LIKE: `/news/${notification.post}`,
    FOLLOW: `/profile/${notification.author._id}`,
    COMMENT: `/news/${notification.post}`,
  };

  return NOTIFICATION_URL[getMessageType(notification)];
};

export const getProfileUrl = (notification: Notification) => {
  return `/profile/${notification.author._id}`;
};
