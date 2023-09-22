import { MouseEventHandler } from 'react';
import Avatar from './Avatar';

type NoticeProps = {
  nickname: string;
  message: string;
  time: string;
  profileImage?: string;
  seen?: boolean;
  onClick: VoidFunction;
  onClickAvatar: MouseEventHandler;
};

const Notice = ({
  nickname,
  message,
  time,
  profileImage,
  onClick,
  onClickAvatar,
  seen = false,
}: NoticeProps) => {
  return (
    <div
      className={`flex flex-col gap-2 bg-input-white w-full max-w-sm rounded-xl px-4 py-5 cursor-pointer border border-lazy-gray ${
        seen ? 'grayscale opacity-50' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center" onClick={onClickAvatar}>
          <Avatar width={1.5} isLoggedIn={false} profileImage={profileImage} />
          <h3 className="text-cooled-blue font-Cafe24Surround font-bold text-sm">{nickname}</h3>
        </div>
        <p className=" text-tertiory-gray font-Cafe24SurroundAir text-sm font-light">{time}</p>
      </div>
      <p className="text-primary-black font-Cafe24SurroundAir text-sm font-light">{message}</p>
    </div>
  );
};

export default Notice;
