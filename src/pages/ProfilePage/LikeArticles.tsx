import { useQuery } from '@tanstack/react-query';
import fetchArticleById from '@/api/fetchArticleById';
import RenderArticles from '../ArticlesPage/RenderArticles';

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
  return article ? <RenderArticles articles={[article]} /> : null;
};

export default LikeArticles;
