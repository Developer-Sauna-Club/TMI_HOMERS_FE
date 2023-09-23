import { useQuery } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Post } from '@type/Post';
import { fetchUserPosts } from '@/api/common/Post';
import { User } from '@/type/User';
import { axiosClient } from '@api/axiosClient';
import { API } from '@constants/Article';
import { ARTICLE_FETCH_LIMIT } from '@constants/Article';

type UseArticlesProps = {
  id?: string;
  type: 'user' | 'channel';
};

const ARTICLES_STALE_TIME = 1000 * 60;

export const useArticles = ({ type }: UseArticlesProps) => {
  const { data = [], isFetching } = useQuery<Post[]>(
    ['articles'],
    async () => {
      const requestUrl =
        type === 'user'
          ? `${API.ARTICLES_URL}${API.AUTHOR_URL}/${API.CHANNEL_ID}`
          : `${API.ARTICLES_URL}${API.CHANNEL_URL}/${API.CHANNEL_ID}`;
      const { data } = await axiosClient.get(requestUrl);
      return data;
    },
    {
      staleTime: ARTICLES_STALE_TIME,
    },
  );

  return { data, isFetching };
};

export const useFollowingArticles = (user: User) => {
  const fetchFollowingArticles = async ({ pageParam = 0 }) => {
    const newArticles = await Promise.all(
      user?.following.map((user) =>
        fetchUserPosts({ offset: pageParam, limit: ARTICLE_FETCH_LIMIT, authorId: user.user }),
      ),
    );
    return newArticles.flat();
  };

  return useInfiniteQuery(['followingArticles'], fetchFollowingArticles, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < ARTICLE_FETCH_LIMIT) {
        return undefined;
      }
      return pages.length * ARTICLE_FETCH_LIMIT;
    },
    enabled: user?.following.length > 0,
  });
};
