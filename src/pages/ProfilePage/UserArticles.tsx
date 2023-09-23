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

  return isLoading ? null : <RenderArticles articles={userArticles} />;
};

export default UserArticles;
