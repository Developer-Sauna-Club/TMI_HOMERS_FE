import Loader from '@/components/Loader';
import { useArticles } from '@/hooks/useArticles';
import Articles from '../ArticlesPage/Articles';

type UserArticlesProps = {
  userId: string;
};

const UserArticles = ({ userId }: UserArticlesProps) => {
  const { data: userArticles, isFetching } = useArticles({
    id: userId,
    type: 'user',
  });
  return isFetching ? <Loader /> : <Articles articles={userArticles} />;
};

export default UserArticles;
