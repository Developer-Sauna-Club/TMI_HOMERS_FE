import { useQuery } from '@tanstack/react-query';
import { Post } from '@type/Post';
import { axiosClient } from '@api/axiosClient';
import { API } from '@constants/Article';

type UseArticlesProps = {
  id?: string;
  type: 'user' | 'channel';
};

const ARTICLES_STALE_TIME = 1000 * 60;

export const useFetchArticles = ({ id, type }: UseArticlesProps) => {
  const { data = [], isLoading } = useQuery<Post[]>({
    queryKey: ['articles', id, type],
    queryFn: async () => {
      const requestUrl =
        type === 'user'
          ? `${API.ARTICLES_URL}${API.AUTHOR_URL}/${id}`
          : `${API.ARTICLES_URL}${API.CHANNEL_URL}/${id}`;
      const { data } = await axiosClient.get(requestUrl);
      return data;
    },
    staleTime: ARTICLES_STALE_TIME,
  });

  return { data, isLoading };
};
