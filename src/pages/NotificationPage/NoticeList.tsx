import { AiOutlineBell } from 'react-icons/ai';
import Notice from '@/components/Notice';
import type { Notification } from '@/type/Notification';
import { getTimeDelta } from '@/utils/getTimeDelta';
import { getNotificationMessage, getNotificationUrl, getProfileUrl } from './helper';

const NoticeList = ({
  notifications,
  handleClickAvatar,
  handleClickNotice,
}: {
  notifications?: Notification[];
  handleClickAvatar: (url: string) => void;
  handleClickNotice: (url: string) => void;
}) => {
  return notifications?.length === 0 ? (
    NoNotification()
  ) : (
    <div className="flex flex-col items-center flex-grow gap-4 p-4 overflow-y-scroll">
      {notifications?.map((notification) => (
        <Notice
          onClick={() => handleClickNotice(getNotificationUrl(notification))}
          onClickAvatar={(event) => {
            event.stopPropagation();
            handleClickAvatar(getProfileUrl(notification));
          }}
          key={notification._id}
          nickname={notification.author.fullName}
          message={getNotificationMessage(notification)}
          time={getTimeDelta(notification.createdAt)}
          profileImage={notification.author?.image}
          seen={notification.seen}
        />
      ))}
    </div>
  );
};

const NoNotification = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-4">
      <div className="w-20 h-20 rounded-full bg-cooled-blue">
        <AiOutlineBell className="w-10 h-10 text-white translate-x-1/2 translate-y-1/2" />
      </div>
      <p className="text-2xl font-light text-wall-street font-Cafe24SurroundAir">
        받은 알림이 없습니다.
      </p>
    </div>
  );
};

export default NoticeList;
