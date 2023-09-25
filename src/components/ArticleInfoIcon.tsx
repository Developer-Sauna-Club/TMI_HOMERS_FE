import { BiSolidComment } from 'react-icons/bi';
import { HiThumbUp } from 'react-icons/hi';

type ArticleInfoIconProps = {
  likes: number;
  comments: number;
  mode?: 'list' | 'post';
  color?: 'blue' | 'gray';
};

const ModeClasses = {
  list: 'justify-start',
  post: 'justify-end',
};

const ArticleInfoIcon = ({ likes, comments, mode = 'list', color }: ArticleInfoIconProps) => {
  const spanStyle =
    'flex items-center text-wall-street dark:text-extra-white text-[0.75rem] h-[0.75rem] ml-0.5';
  const iconStyle = 'icon w-[0.9rem]';

  return (
    <div className={`flex w-[6.25rem] ${ModeClasses[mode]}`}>
      <div className="flex items-center">
        <HiThumbUp
          className={`${iconStyle} ${color === 'blue' ? 'fill-cooled-blue' : 'fill-lazy-gray'}`}
        />
        <span className={spanStyle}>{likes}</span>
      </div>
      <div className="space w-[1rem]" />
      <div className="flex items-center">
        <BiSolidComment className={`${iconStyle} fill-lazy-gray`} />
        <span className={spanStyle}>{comments}</span>
      </div>
    </div>
  );
};

export default ArticleInfoIcon;
