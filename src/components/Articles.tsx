import { Post } from '@type/Post';
import Article from './Article';

type ArticlesProps = {
  articles: Post[];
};

const Articles = ({ articles }: ArticlesProps) => {
  return articles?.map((article) => {
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
    } catch (error) {
      // TODO: title의 JSON.stringify가 제대로 되지 않은 경우 어떻게 처리할까...
    }
  });
};

export default Articles;
