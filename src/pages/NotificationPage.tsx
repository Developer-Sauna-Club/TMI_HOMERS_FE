import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';
import BottomNavigation from '@/components/BottomNavigation';
import HeaderText from '@/components/HeaderText';
import useAuthQuery from '@/hooks/useAuthQuery';
import useNotificationQuery from '@/hooks/useNotificationQuery';
import NoticeList from './NotificationPage/NoticeList';

type Filter = '안 읽음' | '모든 알림' | '읽은 알림';

const NotificationPage = () => {
  const [filter, setFilter] = useState<Filter>('안 읽음');

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

  const dropdownMenu = [
    {
      label: '안 읽음',
      onClick: () => setFilter('안 읽음'),
    },
    {
      label: '모든 알림',
      onClick: () => setFilter('모든 알림'),
    },
    {
      label: '읽은 알림',
      onClick: () => setFilter('읽은 알림'),
    },
  ];

  const filteredNotice = {
    '안 읽음': notifications?.filter(({ seen }) => !seen),
    '모든 알림': notifications,
    '읽은 알림': notifications?.filter(({ seen }) => seen),
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
      <header className="flex justify-between flex-none py-6 w-2/3">
        <HeaderText label="알림" />
        <div className="dropdown dropdown-end top-1/2">
          <label
            tabIndex={0}
            className="btn text-[1.5rem] z-[40] bg-white text-tricorn-black dark:text-lazy-gray dark:bg-tricorn-black focus:text-tricorn-black hover:bg-transparent dark:focus:text-wall-street"
          >
            <IoMdArrowDropdown />
            {filter}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[30] menu p-1 shadow bg-white text-tricorn-black dark:text-lazy-gray dark:bg-tricorn-black border border-lazy-gray rounded-box w-40"
          >
            {dropdownMenu.map((item, i) => (
              <li key={i}>
                <div onClick={() => item.onClick()}>{item.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <NoticeList
        notifications={filteredNotice[filter]}
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
