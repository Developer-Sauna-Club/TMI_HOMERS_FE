import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BottomNavigation, HeaderText } from '@/components';
import { useAuthQuery, useNotificationQuery } from '@/hooks';
import NoticeList from './NotificationPage/NoticeList';

type Filter = '새 알림' | '모든 알림' | '읽은 알림';

const NotificationPage = () => {
  const [filter, setFilter] = useState<Filter>('새 알림');

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
      label: '새 알림',
      onClick: () => setFilter('새 알림'),
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
    '새 알림': notifications?.filter(({ seen }) => !seen),
    '모든 알림': notifications,
    '읽은 알림': notifications?.filter(({ seen }) => seen),
  };

  const handleDropdownClose = () => {
    const liElement = document.activeElement;
    if (liElement instanceof HTMLElement) {
      liElement?.blur();
    }
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
    <div className="flex flex-col items-center h-screen w-screen max-w-[25.875rem] mx-auto">
      <header className="flex justify-between items-center flex-none pt-[4.25rem] pb-[1rem] px-[2rem] w-full">
        <HeaderText label="알림" />
        <div className="dropdown dropdown-end self-end">
          <label
            tabIndex={0}
            className="h-[1.5rem] font-Cafe24SurroundAir border-lazy-gray dark:border-wall-street hover:bg-transparent bg-transparent btn btn-sm text-base z-[40] text-footer-icon dark:text-white focus:text-cooled-blue"
          >
            <IoMdArrowDropdown />
            {filter}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[30] font-Cafe24SurroundAir menu p-1 shadow bg-white text-tricorn-black dark:text-lazy-gray dark:bg-tricorn-black border border-lazy-gray rounded-box w-40"
          >
            {dropdownMenu.map((item, i) => (
              <li
                key={i}
                onClick={() => {
                  item.onClick();
                  handleDropdownClose();
                }}
              >
                <p>{item.label}</p>
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
