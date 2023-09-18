import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidUserCircle } from 'react-icons/bi';
import { BsFillBellFill } from 'react-icons/bs';
import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { RiQuillPenFill } from 'react-icons/ri';
import { useAuthContext } from '@/hooks/useAuthContext';

const NavConstants = {
  HOME: '홈',
  NEWS: '뉴스',
  NOTICE: '알림',
  MYPAGE: 'MY',
};

const BASE_BUTTON_STYLE = 'button inline-flex flex-col items-center justify-center';
const BASE_ICON_STYLE = 'flex items-center justify-center w-[2rem] h-[2rem]';
const BUTTON_COLOR = 'text-footer-icon';
const ACTIVE_COLOR = 'text-cooled-blue';

type BottomNavigationProp = {
  currentPage: string;
};

const BottomNavigation = ({ currentPage }: BottomNavigationProp) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId(user?._id || '');
  }, [user]);

  return (
    <div className="flex items-center justify-evenly max-w-[25.875rem] h-[4.75rem] bg-white shadow-[0_-0.021rem_0_0_rgba(0,0,0,0.3)] font-Cafe24SurroundAir dark:bg-[#1D232A]">
      <button name="home" onClick={() => navigate('/home')} className={BASE_BUTTON_STYLE}>
        <span className={BASE_ICON_STYLE}>
          <AiFillHome
            className={`${currentPage === '/home' ? ACTIVE_COLOR : BUTTON_COLOR}`}
            size="2rem"
            aria-hidden="true"
            fill="currentColor"
          />
        </span>
        <span className={`text-sm ${currentPage === '/home' ? ACTIVE_COLOR : BUTTON_COLOR}`}>
          {NavConstants.HOME}
        </span>
      </button>
      <button name="news" onClick={() => navigate('/news')} className={BASE_BUTTON_STYLE}>
        <span className={BASE_ICON_STYLE}>
          <HiChatBubbleLeftEllipsis
            className={`${currentPage === '/news' ? ACTIVE_COLOR : BUTTON_COLOR}`}
            aria-hidden="true"
            size="2rem"
            fill="currentColor"
          />
        </span>
        <span className={`text-sm ${currentPage === '/news' ? ACTIVE_COLOR : BUTTON_COLOR}`}>
          {NavConstants.NEWS}
        </span>
      </button>

      <button
        name="news-create"
        onClick={() => navigate('/news/create')}
        className={`${BASE_BUTTON_STYLE}position: relative px-5`}
      >
        <span className="flex items-center justify-center position: absolute -bottom-1 w-[3.5rem] h-[3.5rem] bg-cooled-blue rounded-full drop-shadow-[0_0.25rem_0.25rem_rgba(0,0,0,0.25)] transition ease-in-out delay-150 hover:scale-110">
          <RiQuillPenFill className="text-white" size="2rem" fill="currentColor" />
        </span>
      </button>
      <button
        name="notification"
        onClick={() => navigate('/notification')}
        className={BASE_BUTTON_STYLE}
      >
        <span className={BASE_ICON_STYLE}>
          <BsFillBellFill
            className={`${currentPage === '/notification' ? ACTIVE_COLOR : BUTTON_COLOR}`}
            aria-hidden="true"
            size="2rem"
            fill="currentColor"
          />
        </span>
        <span
          className={`text-sm ${currentPage === '/notification' ? ACTIVE_COLOR : BUTTON_COLOR}`}
        >
          {NavConstants.NOTICE}
        </span>
      </button>
      <button
        name="profile"
        onClick={() => {
          if (userId) {
            navigate(`/profile/${userId}`);
          } else {
            navigate('/login');
            return;
          }
        }}
        className={BASE_BUTTON_STYLE}
      >
        <span className={BASE_ICON_STYLE}>
          <BiSolidUserCircle
            className={`${currentPage === `/profile/${userId}` ? ACTIVE_COLOR : BUTTON_COLOR}`}
            aria-hidden="true"
            size="2rem"
            fill="currentColor"
          />
        </span>
        <span
          className={`text-sm ${
            currentPage === `/profile/${userId}` ? ACTIVE_COLOR : BUTTON_COLOR
          }`}
        >
          {NavConstants.MYPAGE}
        </span>
      </button>
    </div>
  );
};

export default BottomNavigation;
