import { useNavigate } from 'react-router-dom';
import { BiSolidComment, BiImageAlt } from 'react-icons/bi';
import { BsFire } from 'react-icons/bs';
import { HiThumbUp } from 'react-icons/hi';
import {
  HOTTEST_ARTICLE_LIKES_THRESHOLD,
  ARTICLE_TITLE_MAX_LENGTH,
  ROUTES,
} from '@constants/Article';

import { getTimeDelta } from '@utils/getTimeDelta';

type ArticleProps = {
  id: string;
  title: string;
  nickname: string;
  postedDate: string;
  hasImage: boolean;
  likes: number;
  comments: number;
  isHome?: boolean;
  myLikeArticle?: boolean;
};

const Article = ({
  id,
  title,
  nickname,
  postedDate,
  hasImage,
  likes,
  comments,
  isHome = true,
  myLikeArticle = false,
}: ArticleProps) => {
  const navigate = useNavigate();
  const timestamp = getTimeDelta(postedDate);
  const isHighlyLiked = likes >= HOTTEST_ARTICLE_LIKES_THRESHOLD;

  return (
    <div
      onClick={() => navigate(`${ROUTES.ARTICLES_URL}/${id}`)}
      className="cursor-pointer max-w-[22.375rem] pl-4 pr-3 pb-[0.625rem] pt-[0.25rem] mb-[0.8rem] mt-[0.5rem] font-Cafe24SurroundAir mx-auto"
    >
      <div className="flex items-center justify-between mb-2 bg-zinc-300">
        <div className="flex">
          {isHighlyLiked && isHome && (
            <BsFire className="text-article-highly-liked mr-[0.25rem] w-[1.1rem] h-[1.1rem]" />
          )}
          <h1 className="text-tricorn-black dark:text-extra-white line-clamp-1 max-w-[14.5rem]">
            {title.length > ARTICLE_TITLE_MAX_LENGTH
              ? `${title.slice(0, ARTICLE_TITLE_MAX_LENGTH)}...`
              : title}
          </h1>
          {hasImage && (
            <BiImageAlt className="text-article-img dark:text-extra-white w-[1.2rem] h-[1.2rem] ml-[0.25rem]" />
          )}
        </div>
        <span className="text-lazy-gray text-[0.75rem]">{timestamp}</span>
      </div>
      <div className="flex justify-between h-[0.75rem]">
        <div className="flex items-center h-full">
          <div className="flex justify-center mr-[1.7rem]">
            <HiThumbUp
              className={`w-[0.9rem] mr-[0.25rem] ${
                myLikeArticle ? 'text-article-highly-liked' : 'text-lazy-gray'
              }`}
            />
            <span className="text-wall-street dark:text-extra-white text-[0.75rem] h-[0.75rem]">
              {likes}
            </span>
          </div>
          <div className="flex justify-center">
            <BiSolidComment className="w-[0.9rem] text-lazy-gray mr-[0.25rem]" />
            <span className="text-wall-street dark:text-extra-white text-[0.75rem] h-[0.75rem]">
              {comments}
            </span>
          </div>
        </div>
        <span className="text-wall-street dark:text-extra-white text-[0.75rem] ">{nickname}</span>
      </div>
    </div>
  );
};

export default Article;
