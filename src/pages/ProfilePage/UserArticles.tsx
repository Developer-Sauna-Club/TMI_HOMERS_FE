import Loader from '@/components/Loader';
import { useArticles } from '@/hooks/useArticles';
import Articles from '../ArticlesPage/Articles';

const UserArticles = ({ userId }: { userId: string }) => {
  const { data: userArticles, isFetching } = useArticles({
    id: userId,
    type: 'user',
  });
  return isFetching ? <Loader /> : <Articles articles={userArticles} />;
};

export default UserArticles;
