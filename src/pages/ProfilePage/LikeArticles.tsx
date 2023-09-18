import { useQuery } from '@tanstack/react-query';
import fetchArticleById from '@/api/fetchArticleById';
import Articles from '../ArticlesPage/Articles';

type LikeArticleProps = {
  likeArticle: {
    post: string;
  };
};

const LikeArticles = ({ likeArticle }: LikeArticleProps) => {
  const { post } = likeArticle;

  const { data: article } = useQuery(['article', post], () => fetchArticleById(post), {
    staleTime: 1000 * 60,
  });
  return article ? <Articles articles={[article]} /> : null;
};

export default LikeArticles;
