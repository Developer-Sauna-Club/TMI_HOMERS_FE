import { AiFillHome } from 'react-icons/ai';
import { BiSolidUserCircle } from 'react-icons/bi';
import { BsFillBellFill } from 'react-icons/bs';
import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { RiQuillPenFill } from 'react-icons/ri';

enum NavConstants {
  HOME = '홈',
  NEWS = '뉴스',
  NOTICE = '알림',
  MYPAGE = 'MY',
}

const BASE_BUTTON_STYLE = 'button inline-flex flex-col items-center justify-center group';
const BASE_ICON_STYLE = 'flex items-center justify-center w-[2rem] h-[2rem]';
const ICON_COLOR = 'text-footer-icon group-hover:text-cooled-blue';
const BASE_TEXT_STYLE = 'text-sm text-footer-icon  group-hover:text-cooled-blue';

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 flex items-center justify-evenly  w-[25.875rem] h-[4.75rem] bg-white shadow-[0_-0.021rem_0_0_rgba(0,0,0,0.3)] font-Cafe24SurroundAir">
      <button className={BASE_BUTTON_STYLE}>
        <span className={BASE_ICON_STYLE}>
          <AiFillHome className={ICON_COLOR} size="2rem" aria-hidden="true" fill="currentColor" />
        </span>
        <span className={BASE_TEXT_STYLE}>{NavConstants.HOME}</span>
      </button>

      <button className={BASE_BUTTON_STYLE}>
        <span className={BASE_ICON_STYLE}>
          <HiChatBubbleLeftEllipsis
            className={ICON_COLOR}
            aria-hidden="true"
            size="2rem"
            fill="currentColor"
          />
        </span>
        <span className={BASE_TEXT_STYLE}>{NavConstants.NEWS}</span>
      </button>

      <button className={`${BASE_BUTTON_STYLE}position: relative px-5`}>
        <span className="flex items-center justify-center position: absolute -bottom-1 w-[3.5rem] h-[3.5rem] bg-cooled-blue rounded-full drop-shadow-[0_0.25rem_0.25rem_rgba(0,0,0,0.25)] transition ease-in-out delay-150 hover:scale-110">
          <RiQuillPenFill className="text-white" size="2rem" fill="currentColor" />
        </span>
      </button>

      <button className={BASE_BUTTON_STYLE}>
        <span className={BASE_ICON_STYLE}>
          <BsFillBellFill
            className={ICON_COLOR}
            aria-hidden="true"
            size="2rem"
            fill="currentColor"
          />
        </span>
        <span className={BASE_TEXT_STYLE}>{NavConstants.NOTICE}</span>
      </button>
      <button className={BASE_BUTTON_STYLE}>
        <span className={BASE_ICON_STYLE}>
          <BiSolidUserCircle
            className={ICON_COLOR}
            aria-hidden="true"
            size="2rem"
            fill="currentColor"
          />
        </span>
        <span className={BASE_TEXT_STYLE}>{NavConstants.MYPAGE}</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
