import { useNavigate } from 'react-router-dom';
import { Post } from '@type/Post';
import useAuthQuery from '@/hooks/useAuthQuery';
import Article from '@components/Article';
import SubButton from '@components/SubButton';
import { API } from '@constants/Article';
import { filterArticles } from './filterArticles';

type ArticlesProps = {
  articles: Post[];
};

const RenderArticles = ({ articles }: ArticlesProps) => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();
  const navigate = useNavigate();

  const filteredArticles = filterArticles(articles);
  const isArticlesEmpty = filteredArticles && filteredArticles.length === 0;

  if (isArticlesEmpty) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-4 mx-auto mt-4">
        <span className="text-center">앗, 팔로우한 사람들의 글 목록이 존재하지 않습니다!</span>
        <div
          className="inline-block mx-auto"
          onClick={() => {
            navigate(`${API.SEARCH_URL}`);
          }}
        >
          <SubButton size="small" color="blue" label="팔로우 하러 가기" type="outline" />
        </div>
      </div>
    );
  }

  return filteredArticles?.map((article) => {
    const { _id, title, author, createdAt, likes, image, comments } = article;
    const { fullName } = author;
    const myLike = likes.find((like) => (user ? like.user === user._id : false));
    try {
      const { title: articleTitle } = JSON.parse(title);
      return (
        <Article
          key={_id}
          id={_id}
          title={articleTitle ? articleTitle : '제목이 없습니다.'}
          nickname={fullName ? `@${fullName}` : ''}
          postedDate={createdAt}
          hasImage={image !== undefined}
          likes={likes?.length || 0}
          comments={comments?.length || 0}
          myLikeArticle={!!myLike}
        />
      );
    } catch (e) {
      // title에 JSON.parse가 안되는게 존재하면 에러남.
    }
  });
};

export default RenderArticles;
