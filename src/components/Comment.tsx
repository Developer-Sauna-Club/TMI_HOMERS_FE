import Avatar from './Avatar';
import CloseButton from './CloseButton';

type CommentProps = {
  nickname: string;
  content: string;
  postedDate: string;
  active: boolean;
};

const getTimestamp = (postedDate: string) => {
  const dt = new Date(postedDate);
  const [year, month, date, hours, minutes] = [
    dt.getFullYear().toString().slice(-2),
    dt.getMonth() + 1,
    dt.getDate(),
    dt.getHours(),
    dt.getMinutes(),
  ];
  return `${year}/${month}/${date} ${hours}:${minutes}`;
};

const Comment = ({ nickname, content, postedDate, active }: CommentProps) => {
  const timestamp = getTimestamp(postedDate);

  return (
    <div className="flex justify-center items-center w-[23rem] min-h-[6rem] p-1">
      <div className="flex flex-col w-[22.125rem]  font-Cafe24SurroundAir">
        <div className="flex w-[22.125rem] h-[1.5rem]">
          <div className="icon">
            <Avatar width={1.5} profileImage="" isLoggedIn={false} />
          </div>
          <div className="ml-1 w-[19.62rem] text-wall-street text-base">{nickname}</div>
          <div className="flex w-[1rem]">{active && <CloseButton mode="small" />}</div>
        </div>
        <div className="flex items-center min-h-[2.4rem] p-1 text-base break-all">
          <span>{content}</span>
        </div>
        <div className="w-[22.125rem] h-[1.125rem] text-wall-street text-sm">{timestamp}</div>
      </div>
    </div>
  );
};

export default Comment;
