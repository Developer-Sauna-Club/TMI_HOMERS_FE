import { useInfiniteQuery } from '@tanstack/react-query';
import fetchArticleById from '@api/fetchArticleById';
import Loader from '@components/Loader';
import SearchSkeleton from '@components/SearchSkeleton';
import { ARTICLE_FETCH_LIMIT } from '@constants/Article';
import RenderArticles from '@pages/ArticlesPage/RenderArticles';
import InfiniteScroll from '../ArticlesPage/InfiniteScroll';

const calculateIndices = (page: number, postIdsLength: number) => {
  const startIdx = Math.min((page - 1) * ARTICLE_FETCH_LIMIT, postIdsLength);
  const endIdx = Math.min(startIdx + ARTICLE_FETCH_LIMIT, postIdsLength);
  return { startIdx, endIdx };
};

const RenderLikedArticles = ({ postIds }: { postIds: string[] }) => {
  const fetchArticlesByPage = async ({ pageParam = 1 }) => {
    const { startIdx, endIdx } = calculateIndices(pageParam, postIds.length);

    if (startIdx === endIdx) {
      return [];
    }

    const requests = postIds.slice(startIdx, endIdx).map((postId) => fetchArticleById(postId));
    return Promise.all(requests);
  };

  const {
    data: infiniteFetchLikedArticles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(['likedArticles'], fetchArticlesByPage, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },
  });

  return (
    <>
      {isLoading && <SearchSkeleton SkeletonType="title" />}
      {infiniteFetchLikedArticles?.pages.flatMap((page) => page) && (
        <RenderArticles articles={infiniteFetchLikedArticles?.pages.flatMap((page) => page)} />
      )}
      {isFetchingNextPage ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <InfiniteScroll fetchData={fetchNextPage} canFetchMore={hasNextPage} />
      )}
    </>
  );
};

export default RenderLikedArticles;
