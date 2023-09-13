import { BiSolidComment } from 'react-icons/bi';
import { HiThumbUp } from 'react-icons/hi';

type ArticleInfoIconProps = {
  likes: number;
  comments: number;
  mode?: 'list' | 'post';
};

const ModeClasses = {
  list: 'justify-start',
  post: 'justify-end',
};

const ArticleInfoIcon = ({ likes, comments, mode = 'list' }: ArticleInfoIconProps) => {
  const spanStyle = 'flex items-center text-wall-street text-[0.75rem] h-[0.75rem] ml-0.5';
  const iconStyle = 'icon w-[0.9rem] fill-lazy-gray';

  return (
    <div className={`flex w-[6.25rem] ${ModeClasses[mode]}`}>
      <div className="flex items-center">
        <HiThumbUp className={iconStyle} />
        <span className={spanStyle}>{likes}</span>
      </div>
      <div className="space w-[1rem]" />
      <div className="flex items-center">
        <BiSolidComment className={iconStyle} />
        <span className={spanStyle}>{comments}</span>
      </div>
    </div>
  );
};

export default ArticleInfoIcon;
