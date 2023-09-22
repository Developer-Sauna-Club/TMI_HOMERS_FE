import { useNavigate } from 'react-router-dom';
import { AiOutlineBell } from 'react-icons/ai';
import BottomNavigation from '@/components/BottomNavigation';
import HeaderText from '@/components/HeaderText';
import Notice from '@/components/Notice';
import useAuthQuery from '@/hooks/useAuthQuery';
import useNotificationQuery from '@/hooks/useNotificationQuery';
import { getTimeDelta } from '@/utils/getTimeDelta';
import {
  getNotificationMessage,
  getNotificationUrl,
  getProfileUrl,
} from './NotificationPage/helper';

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

const NotificationPage = () => {
  const navigate = useNavigate();

  const handleClickNotice = (url: string) => {
    navigate(url);
  };

  const handleClickAvatar = (profileUrl: string) => {
    navigate(profileUrl);
  };

  const {
    userQuery: { data: user },
  } = useAuthQuery();
  const userId = user?._id;
  const {
    notificationQuery: { data: notifications },
  } = useNotificationQuery(userId);

  // console.log(notifications);

  return (
    <div className="flex flex-col items-center h-screen">
      <header className="flex-none py-6">
        <HeaderText label="알림" />
      </header>
      {notifications?.length === 0 ? (
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
      )}
      <div className="flex justify-center flex-none w-full">
        <BottomNavigation currentPage="/notification" />
      </div>
    </div>
  );
};

export default NotificationPage;
