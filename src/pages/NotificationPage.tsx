import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import HeaderText from '@/components/HeaderText';
import useAuthQuery from '@/hooks/useAuthQuery';
import useNotificationQuery from '@/hooks/useNotificationQuery';
import NoticeList from './NotificationPage/NoticeList';

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
    readNotifications,
  } = useNotificationQuery(userId);

  const preventClose = () => {
    readNotifications.mutate();
  };

  useEffect(
    () => {
      window.addEventListener('beforeunload', preventClose);

      return () => {
        readNotifications.mutate();
        window.removeEventListener('beforeunload', preventClose);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div className="flex flex-col items-center h-screen">
      <header className="flex-none py-6 w-2/3">
        <HeaderText label="알림" />
      </header>
      <NoticeList
        notifications={notifications}
        handleClickAvatar={handleClickAvatar}
        handleClickNotice={handleClickNotice}
      />
      <div className="flex justify-center flex-none w-full">
        <BottomNavigation currentPage="/notification" />
      </div>
    </div>
  );
};

export default NotificationPage;
