import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { fetchAllPosts, fetchUserPosts } from '@/api/Post';

type useFetchArticlesProps = {
  type: 'newest' | 'subscribed';
  followingUsersIds: string[];
};

const ARTICLES_LIMIT = {
  newest: 10,
  subscribed: 3,
};

const QUERY_KEY = {
  newest: 'newestArticles',
  subscribed: 'followingArticles',
};

const useFetchArticles = ({ type, followingUsersIds }: useFetchArticlesProps) => {
  const FETCH_API = {
    newest: async ({ pageParam }: { pageParam: number }) => {
      return await fetchAllPosts({ offset: pageParam, limit: ARTICLES_LIMIT[type] });
    },
    subscribed: async ({ pageParam }: { pageParam: number }) => {
      const newArticles = await Promise.all(
        followingUsersIds.map((user) =>
          fetchUserPosts({
            offset: pageParam,
            limit: ARTICLES_LIMIT[type],
            authorId: user,
          }),
        ),
      );
      return newArticles.flat();
    },
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery(
    infiniteQueryOptions({
      queryKey: [QUERY_KEY[type]],
      queryFn: FETCH_API[type],
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) =>
        lastPage.length < ARTICLES_LIMIT[type] ? undefined : pages.length * ARTICLES_LIMIT[type],
    }),
  );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  };
};

export default useFetchArticles;
