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

  return isLoading ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loader />
    </div>
  ) : (
    <RenderArticles articles={userArticles} />
  );
};

export default UserArticles;
