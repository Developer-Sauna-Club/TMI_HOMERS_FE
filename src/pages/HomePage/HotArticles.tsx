import { useNavigate } from 'react-router-dom';
import { Post } from '@type/Post';
import SubButton from '@/components/SubButton';
import { ROUTES } from '@/constants/Article';
import Article from '@components/Article';

type ArticlesProps = {
  articles: Post[];
};

const HotArticles = ({ articles }: ArticlesProps) => {
  const navigate = useNavigate();
  const isArticlesEmpty = articles && articles.length === 0;

  if (isArticlesEmpty) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full gap-4 font-Cafe24SurroundAir">
        <p>앗, 뜨거운 뉴스가 없네요!</p>
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
    );
  }

  return articles?.map((article) => {
    const { _id, title, author, createdAt, likes, image, comments } = article;
    const { fullName } = author;
    try {
      const { title: articleTitle } = JSON.parse(title);
      return (
        <Article
          isHome={false}
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

export default HotArticles;
