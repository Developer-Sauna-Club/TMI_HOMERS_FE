import Avatar from './Avatar';

type NoticeProps = {
  nickname: string;
  message: string;
  time: string;
  isShowButton?: boolean;
  buttonLabel?: '팔로우' | '언팔로우';
  profileImage: string;
};

const Notice = ({
  nickname,
  message,
  time,
  isShowButton = true,
  buttonLabel = '팔로우',
  profileImage,
}: NoticeProps) => {
  return (
    <div className="flex flex-col gap-2 bg-input-white w-96 shadow-lg rounded-xl px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Avatar width={1.5} isLoggedIn={false} profileImage={profileImage} />
          <h3 className="text-cooled-blue font-Cafe24Surround font-bold text-sm">{nickname}</h3>
        </div>
        <p className=" text-tertiory-gray font-Cafe24SurroundAir text-sm font-light">{time}</p>
      </div>
      <div className="flex justify-between items-center gap-4">
        <p className="text-primary-black font-Cafe24SurroundAir text-sm font-light">{message}</p>
        {isShowButton && <button>{buttonLabel}</button>}
      </div>
    </div>
  );
};

export default Notice;
