import Loader from '@components/Loader';
import { useArticles } from '@hooks/useArticles';
import RenderArticles from '../ArticlesPage/RenderArticles';

type UserArticlesProps = {
  userId: string;
};

const UserArticles = ({ userId }: UserArticlesProps) => {
  const { data: userArticles, isLoading } = useArticles({
    id: userId,
    type: 'user',
  });

  return isLoading ? <Loader /> : <RenderArticles articles={userArticles} />;
};

export default UserArticles;
