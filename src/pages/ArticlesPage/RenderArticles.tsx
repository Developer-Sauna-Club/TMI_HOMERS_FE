import { Post } from '@type/Post';
import useAuthQuery from '@/hooks/useAuthQuery';
import Article from '@components/Article';
import { filterArticles } from './filterArticles';

type ArticlesProps = {
  articles: Post[];
};

const RenderArticles = ({ articles }: ArticlesProps) => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();
  const filteredArticles = filterArticles(articles);

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
          hasImage={!!image}
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
