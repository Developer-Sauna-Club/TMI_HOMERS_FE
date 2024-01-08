import Article from '@components/Article';
import SearchSkeleton from '@components/SearchSkeleton';
import { API } from '@constants/Article';
import { TAB_CONSTANTS } from '@constants/Tab';
import useAuthQuery from '@hooks/useAuthQuery';
import { useFetchArticles } from '@hooks/useFetchArticles';
import { useFilteredArticles } from '@hooks/useFilteredArticles';

const RenderHottestArticles = () => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();
  const { data: articles, isLoading } = useFetchArticles({
    id: API.CHANNEL_ID,
    type: 'channel',
  });

  const hottestArticles = useFilteredArticles(TAB_CONSTANTS.HOTTEST, articles);

  return (
    <>
      {isLoading && <SearchSkeleton SkeletonType="title" />}
      {hottestArticles?.map((article) => {
        const { _id, title, author, createdAt, likes, image, comments } = article;
        const { fullName } = author;
        const myLike = likes.find((like) => (user ? like.user === user._id : false));
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
              myLikeArticle={!!myLike}
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
