import { BiSolidComment, BiImageAlt } from 'react-icons/bi';
import { BsFire } from 'react-icons/bs';
import { HiThumbUp } from 'react-icons/hi';

type ISO8601_STRING = string;
type ArticleProps = {
  title: string;
  nickname: string;
  postedDate: ISO8601_STRING;
  hasImage: boolean;
  likes: number;
  comments: number;
};

const getTimestamp = (postedDate: ISO8601_STRING) => {
  const dt = new Date(postedDate);
  const now = new Date();
  const diff = now.getTime() - dt.getTime();

  if (isNaN(diff)) {
    return '알 수 없음';
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  let result = '';

  switch (true) {
    case seconds < 60:
      result = `${seconds}초 전`;
      break;
    case minutes < 60:
      result = `${minutes}분 전`;
      break;
    case hours < 24:
      result = `${hours}시간 전`;
      break;
    case days < 30:
      result = `${days}일 전`;
      break;
    case months < 12:
      result = `${months}달 전`;
      break;
    default:
      result = `${years}년 전`;
  }

  return result;
};

const Article = ({ title, nickname, postedDate, hasImage, likes, comments }: ArticleProps) => {
  const timestamp = getTimestamp(postedDate);
  const isHighlyLiked = likes >= 15;

  return (
    <div className="max-w-[22.375rem] pl-4 pr-3 pb-[0.625rem] pt-[0.25rem] font-Cafe24SurroundAir">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {isHighlyLiked && (
            <BsFire className="text-article-highly-liked mr-[0.25rem] w-[1rem] h-[1rem]" />
          )}
          <h1 className="text-tricorn-black dark:text-extra-white line-clamp-1 max-w-[16.625rem]">
            {title}
          </h1>
          {hasImage && (
            <BiImageAlt className="text-article-img dark:text-extra-white w-[1rem] h-[1rem] ml-[0.25rem]" />
          )}
        </div>
        <span className="text-lazy-gray text-[0.3rem]">{timestamp}</span>
      </div>
      <div className="flex justify-between h-[0.75rem]">
        <div className="flex items-center h-full">
          <div className="flex justify-center mr-[1.7rem]">
            <HiThumbUp
              className={`w-[0.9rem] mr-[0.25rem] ${
                isHighlyLiked ? 'text-article-highly-liked' : 'text-lazy-gray'
              }`}
            />
            <span className="text-wall-street text-[0.75rem] h-[0.75rem]">{likes}</span>
          </div>
          <div className="flex justify-center">
            <BiSolidComment className="w-[0.9rem] text-lazy-gray mr-[0.25rem]" />
            <span className="text-wall-street text-[0.75rem] h-[0.75rem]">{comments}</span>
          </div>
        </div>
        <span className="text-wall-street text-[0.375rem] ">{nickname}</span>
      </div>
    </div>
  );
};

export default Article;
