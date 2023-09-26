import { useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import SearchSkeleton from '@/components/SearchSkeleton';
import { ARTICLE_FETCH_LIMIT } from '@/constants/Article';
import { TAB_CONSTANTS } from '@/constants/Tab';
import useAuthQuery from '@/hooks/useAuthQuery';
import { fetchArticles } from './fetchArticles';
import InfiniteScroll from './InfiniteScroll';
import RenderArticles from './RenderArticles';

const RenderFollowingArticles = () => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();

  const followingUsersIds = Array.from(new Set(user?.following.map((user) => user.user)));

  const fetchFollowing = useCallback(
    async ({ pageParam = 0 }) => {
      return fetchArticles({
        type: TAB_CONSTANTS.SUBSCRIBED,
        pageParam,
        followingUsersIds,
      });
    },
    [followingUsersIds],
  );

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery(
    ['followingArticles', followingUsersIds],
    fetchFollowing,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < ARTICLE_FETCH_LIMIT) {
          return undefined;
        }
        return pages.length * ARTICLE_FETCH_LIMIT;
      },
    },
  );

  return (
    <>
      {isLoading ? (
        <SearchSkeleton SkeletonType="title" />
      ) : (
        <>
          {data?.pages.flat().length === 0 && (
            <div className="flex flex-col items-center justify-center w-full gap-4 mx-auto mt-4">
              <span className="text-center">
                앗, 팔로우한 사람들의 글 목록이 존재하지 않습니다!
              </span>
            </div>
          )}
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

export default RenderFollowingArticles;
