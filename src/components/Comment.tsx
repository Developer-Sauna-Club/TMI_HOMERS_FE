import { getTimeStamp } from '@utils/getTimeStamp';
import Avatar from './Avatar';
import CloseButton from './CloseButton';

type CommentProps = {
  commentId: string;
  nickname: string;
  content: string;
  postedDate: string;
  active: boolean;
  onDelete: (commentId: string) => void;
};

const Comment = ({ commentId, nickname, content, postedDate, active, onDelete }: CommentProps) => {
  const timestamp = getTimeStamp(postedDate);

  return (
    <div className="flex justify-center items-center w-[20rem] min-h-[6rem] mt-3">
      <div className="flex flex-col w-[20rem]  font-Cafe24SurroundAir">
        <div className="flex w-[20rem] h-[1.5rem]">
          <div className="icon cursor-pointer">
            <Avatar width={1.5} profileImage="" isLoggedIn={false} />
          </div>
          <div className="ml-2 w-[18rem] text-wall-street text-base">
            <span className="text-sm cursor-pointer">{nickname}</span>
          </div>
          <div className="flex w-[1rem]">
            {active && <CloseButton mode="small" onClick={() => onDelete(commentId)} />}
          </div>
        </div>
        <div className="flex items-center min-h-[2.4rem] py-3 text-base break-all">
          <span>{content}</span>
        </div>
        <div className="w-[20rem] h-[1.125rem] text-wall-street text-xs">{timestamp}</div>
        <div className="w-[20rem] mt-[7%] border-b-[0.01rem] border-gray" />
      </div>
    </div>
  );
};

export default Comment;
