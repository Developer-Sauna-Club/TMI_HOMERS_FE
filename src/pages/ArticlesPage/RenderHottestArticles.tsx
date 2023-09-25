import Article from '@/components/Article';
import Loader from '@/components/Loader';
import { API } from '@/constants/Article';
import { TAB_CONSTANTS } from '@/constants/Tab';
import { useArticles } from '@/hooks/useArticles';
import { useFilteredArticles } from '@/hooks/useFilteredArticles';

const RenderHottestArticles = () => {
  const { data: articles, isLoading } = useArticles({
    id: API.CHANNEL_ID,
    type: 'channel',
  });

  const hottestArticles = useFilteredArticles(TAB_CONSTANTS.HOTTEST, articles);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
      {hottestArticles?.map((article) => {
        const { _id, title, author, createdAt, likes, image, comments } = article;
        const { fullName } = author;
        try {
          const { title: articleTitle } = JSON.parse(title);
          return (
            <Article
              key={_id}
              id={_id}
              title={articleTitle ? articleTitle : '제목이 없습니다.'}
              nickname={fullName ? `@${fullName}` : ''}
              postedDate={createdAt}
              hasImage={image !== undefined}
              likes={likes?.length || 0}
              comments={comments?.length || 0}
            />
          );
        } catch (e) {
          // title에 JSON.parse가 안되는게 존재하면 에러남.
        }
      })}
    </>
  );
};

export default RenderHottestArticles;
