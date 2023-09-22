import Avatar from './Avatar';

type NoticeProps = {
  nickname: string;
  message: string;
  time: string;
  isShowButton?: boolean;
  buttonLabel?: '팔로우' | '언팔로우';
  profileImage?: string;
  onClick: VoidFunction;
};

const Notice = ({
  nickname,
  message,
  time,
  isShowButton = true,
  buttonLabel = '팔로우',
  profileImage,
  onClick,
}: NoticeProps) => {
  return (
    <div
      className="flex flex-col gap-2 bg-input-white w-5/6 max-w-sm shadow-lg rounded-xl px-4 py-5 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Avatar width={1.5} isLoggedIn={false} profileImage={profileImage} />
          <h3 className="text-cooled-blue font-Cafe24Surround font-bold text-sm">{nickname}</h3>
        </div>
        <p className=" text-tertiory-gray font-Cafe24SurroundAir text-sm font-light">{time}</p>
      </div>
      <div className="flex justify-between items-center gap-4">
        <p className="text-primary-black font-Cafe24SurroundAir text-sm font-light">{message}</p>
        {isShowButton && (
          <button className="btn bg-cooled-blue border-none hover:bg-cooled-blue hover:bg-opacity-75 text-input-white btn-active ">
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Notice;
