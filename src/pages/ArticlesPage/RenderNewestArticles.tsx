import { useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loader from '@components/Loader';
import SearchSkeleton from '@components/SearchSkeleton';
import { ARTICLE_FETCH_LIMIT } from '@constants/Article';
import { TAB_CONSTANTS } from '@constants/Tab';
import { fetchArticles } from './fetchArticles';
import InfiniteScroll from './InfiniteScroll';
import RenderArticles from './RenderArticles';

const RenderNewestArticles = () => {
  const fetchNewest = useCallback(async ({ pageParam = 0 }) => {
    return fetchArticles({ type: TAB_CONSTANTS.NEWEST, pageParam });
  }, []);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery({
    queryKey: ['newestArticles'],
    queryFn: fetchNewest,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < ARTICLE_FETCH_LIMIT) {
        return undefined;
      }
      return pages.length * ARTICLE_FETCH_LIMIT;
    },
    initialPageParam: 0,
  });

  return (
    <>
      {isLoading ? (
        <SearchSkeleton SkeletonType="title" />
      ) : (
        <>
          <RenderArticles articles={data?.pages.flat() || []} />
          {isFetching && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
          <InfiniteScroll fetchData={fetchNextPage} canFetchMore={hasNextPage} />
        </>
      )}
    </>
  );
};

export default RenderNewestArticles;
