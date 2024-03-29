import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPost } from '@/api/Post';
import { Loader, SearchSkeleton } from '@/components';
import { ARTICLE_FETCH_LIMIT } from '@constants/Article';
import RenderArticles from '@pages/ArticlesPage/RenderArticles';
import InfiniteScroll from '../ArticlesPage/InfiniteScroll';

const calculateIndices = (page: number, postIdsLength: number) => {
  const startIdx = Math.min((page - 1) * ARTICLE_FETCH_LIMIT, postIdsLength);
  const endIdx = Math.min(startIdx + ARTICLE_FETCH_LIMIT, postIdsLength);
  return { startIdx, endIdx };
};

const RenderLikedArticles = ({ postIds }: { postIds: string[] }) => {
  const fetchArticlesByIdx = async ({ pageParam = 1 }) => {
    const { startIdx, endIdx } = calculateIndices(pageParam, postIds.length);

    if (startIdx === endIdx) {
      return [];
    }

    const requests = postIds.slice(startIdx, endIdx).map(fetchPost);
    return Promise.all(requests);
  };

  const {
    data: fetchedLikeArticles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(['likedArticles', postIds.length], fetchArticlesByIdx, {
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
      {fetchedLikeArticles?.pages.flatMap((page) => page) && (
        <RenderArticles articles={fetchedLikeArticles?.pages.flatMap((page) => page)} />
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
