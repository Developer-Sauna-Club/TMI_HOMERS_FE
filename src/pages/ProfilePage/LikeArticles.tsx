import { useQuery } from '@tanstack/react-query';
import fetchArticleById from '@api/fetchArticleById';
import Loader from '@components/Loader';
import RenderArticles from '../ArticlesPage/RenderArticles';

const LikedArticles = ({ postIds }: { postIds: string[] }) => {
  const fetchMultipleArticles = async () => {
    const requests = postIds.map((postId) => fetchArticleById(postId));
    return Promise.all(requests);
  };

  const { data: allFetchedArticles } = useQuery(['articles', postIds], fetchMultipleArticles);

  return allFetchedArticles ? <RenderArticles articles={allFetchedArticles} /> : <Loader />;
};

export default LikedArticles;
