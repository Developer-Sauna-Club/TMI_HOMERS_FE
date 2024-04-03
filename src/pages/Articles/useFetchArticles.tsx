import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAllPosts, fetchUserPosts } from '@/api/Post';

type useFetchArticlesProps = {
  type: 'newest' | 'subscribed';
  followingUsersIds: string[];
};

const useFetchArticles = ({ type, followingUsersIds }: useFetchArticlesProps) => {
  const LIMIT = {
    newest: 10,
    subscribed: 3,
  };

  const QUERY_KEY = {
    newest: 'newestArticles',
    subscribed: 'followingArticles',
  };

  const FETCH_API = {
    newest: async ({ pageParam = 0 }) => {
      return await fetchAllPosts({ offset: pageParam, limit: LIMIT[type] });
    },
    subscribed: async ({ pageParam = 0 }) => {
      const newArticles = await Promise.all(
        followingUsersIds.map((user) =>
          fetchUserPosts({ offset: pageParam, limit: LIMIT[type], authorId: user }),
        ),
      );
      return newArticles.flat();
    },
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery(
    [QUERY_KEY[type]],
    FETCH_API[type],
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length < LIMIT[type] ? undefined : pages.length * LIMIT[type];
      },
    },
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
