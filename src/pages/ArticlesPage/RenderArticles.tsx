import { useNavigate } from 'react-router-dom';
import { Post } from '@type/Post';
import Article from '@components/Article';
import SubButton from '@components/SubButton';
import { API, ROUTES } from '@constants/Article';
import { filterArticles } from './filterArticles';

type ArticlesProps = {
  articles: Post[];
};

const RenderArticles = ({ articles }: ArticlesProps) => {
  const navigate = useNavigate();

  const filteredArticles = filterArticles(articles);
  const isArticlesEmpty = filteredArticles && filteredArticles.length === 0;

  if (isArticlesEmpty) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-4 mx-auto mt-4 font-Cafe24SurroundAir">
        <span>앗, 최신의 뉴스가 없네요!</span>
        <div
          className="inline-block mx-auto"
          onClick={() => {
            navigate(`${API.SEARCH_URL}`);
          }}
        >
          <SubButton
            size="small"
            color="blue"
            label="다른 뉴스들 보러 가기"
            type="outline"
            onClick={() => {
              navigate(`${ROUTES.ARTICLES_URL}`);
            }}
          />
        </div>
      </div>
    );
  }

  return filteredArticles?.map((article) => {
    const { _id, title, author, createdAt, likes, image, comments } = article;
    const { fullName } = author;
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
        />
      );
    } catch (e) {
      // title에 JSON.parse가 안되는게 존재하면 에러남.
    }
  });
};

export default RenderArticles;
