import { getTimeStamp } from '@/utils/getTimeStamp';
import Avatar from './Avatar';

type ArticleDetailProps = {
  nickname: string;
  postedDate: string;
};

const ArticleDetail = ({ nickname, postedDate }: ArticleDetailProps) => {
  const timestamp = getTimeStamp(postedDate);

  return (
    <div className="flex justify-center items-center w-[23rem] min-h-[6rem] p-1 font-Cafe24SurroundAir text-tricorn-black">
      <div className="flex flex-col w-[22.125rem]">
        <div className="flex w-[22.125rem] h-[1.5rem]">
          <div className="icon cursor-pointer">
            <Avatar width={2.5} profileImage="" isLoggedIn={false} />
          </div>
          <div className="ml-3 w-[19.62rem]">
            <div className="cursor-pointer">{nickname}</div>
            <div className="text-wall-street text-xs">{timestamp}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
