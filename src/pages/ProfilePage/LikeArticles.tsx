import { useQuery } from '@tanstack/react-query';
import fetchArticleById from '@api/fetchArticleById';
import Articles from '../ArticlesPage/Articles';

const LikedArticles = ({ postIds }: { postIds: string[] }) => {
  const fetchMultipleArticles = async () => {
    const requests = postIds.map((postId) => fetchArticleById(postId));
    return Promise.all(requests);
  };

  const { data: allFetchedArticles } = useQuery(['articles', postIds], fetchMultipleArticles);

  return allFetchedArticles ? <Articles articles={allFetchedArticles} /> : null;
};

export default LikedArticles;
