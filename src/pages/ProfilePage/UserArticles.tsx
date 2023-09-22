import { useArticles } from '@hooks/useArticles';
import Articles from '../ArticlesPage/Articles';

type UserArticlesProps = {
  userId: string;
};

const UserArticles = ({ userId }: UserArticlesProps) => {
  const { data: userArticles, isFetching } = useArticles({
    id: userId,
    type: 'user',
  });
  return isFetching ? null : <Articles articles={userArticles} />;
};

export default UserArticles;
