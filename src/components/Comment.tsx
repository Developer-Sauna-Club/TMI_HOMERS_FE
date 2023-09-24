import { useNavigate } from 'react-router-dom';
import { getTimeStamp } from '@utils/getTimeStamp';
import Avatar from './Avatar';
import CloseButton from './CloseButton';

type CommentProps = {
  commentId: string;
  nickname: string;
  content: string;
  postedDate: string;
  active: boolean;
  profileImage: string;
  authorId: string;
  onDelete: (commentId: string) => void;
};

const Comment = ({
  commentId,
  nickname,
  content,
  postedDate,
  active,
  profileImage,
  authorId,
  onDelete,
}: CommentProps) => {
  const timestamp = getTimeStamp(postedDate);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-[20rem] min-h-[6rem] mt-3 text-tricorn-black dark:text-extra-white">
      <div className="flex flex-col w-[20rem]  font-Cafe24SurroundAir">
        <div className="flex w-[20rem] h-[1.5rem]">
          <div className="icon cursor-pointer">
            <Avatar
              width={1.5}
              profileImage={profileImage}
              isLoggedIn={false}
              onClick={() => navigate(`/profile/${authorId}`)}
            />
          </div>
          <div className="ml-2 w-[18rem] text-wall-street dark:text-extra-white text-base">
            <span
              className="text-sm cursor-pointer"
              onClick={() => navigate(`/profile/${authorId}`)}
            >
              {nickname}
            </span>
          </div>
          <div className="flex w-[1rem]">
            {active && <CloseButton mode="small" onClick={() => onDelete(commentId)} />}
          </div>
        </div>
        <div className="flex items-center min-h-[2.4rem] py-3 text-base break-all">
          <span>{content}</span>
        </div>
        <div className="w-[20rem] h-[1.125rem] text-wall-street text-xs">{timestamp}</div>
        <div className="w-[20rem] mt-[7%] border-b-[0.01rem] border-gray-200 dark:border-gray-700" />
      </div>
    </div>
  );
};

export default Comment;
