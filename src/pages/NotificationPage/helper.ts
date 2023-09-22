import type { NotificationType } from '@/api/common/Notification';
import type { Notification } from '@/type/Notification';

type NoticeMessage = {
  [key in NotificationType]: {
    FRONT: string;
    MIDDLE: string;
    REAR: string;
  };
};

const NOTICE_MESSAGE: NoticeMessage = {
  LIKE: {
    FRONT: '님이 회원님의 뉴스를 ',
    MIDDLE: '',
    REAR: '응원합니다',
  },
  COMMENT: {
    FRONT: '님이 회원님의 뉴스에 ',
    MIDDLE: '댓글',
    REAR: '을 달았습니다',
  },
  FOLLOW: {
    FRONT: '님이 회원님을 ',
    MIDDLE: '구독',
    REAR: '합니다',
  },
};

interface GetMessageType {
  (args: Partial<Notification>): NotificationType;
}

const getMessageType: GetMessageType = ({ user, follow, comment }) => {
  if (follow) {
    return 'FOLLOW';
  }
  if (comment) {
    return 'COMMENT';
  }
  if (user) {
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

  return `${nickname}${NOTICE_MESSAGE[notificationType].FRONT} ${NOTICE_MESSAGE[notificationType].MIDDLE}${NOTICE_MESSAGE[notificationType].REAR}`;
};

export const getNotificationUrl = (notification: Notification) => {
  const NOTIFICATION_URL = {
    LIKE: `/news/${notification.post}`,
    FOLLOW: `/profile/${notification.author._id}`,
    COMMENT: `/news/${notification.post}`,
  };

  return NOTIFICATION_URL[getMessageType(notification)];
};
