import { useQuery } from '@tanstack/react-query';
import { Post } from '@type/Post';
import { axiosClient } from '@api/axiosClient';
import { API } from '@constants/Article';

type UseArticlesProps = {
  id?: string;
  type: 'user' | 'channel';
};

export const useArticles = ({ id, type }: UseArticlesProps) => {
  const { data = [], isFetching } = useQuery<Post[]>(
    ['articles', id, type],
    async () => {
      if (type === 'user') {
        const response = await axiosClient.get(`${API.ARTICLES_URL}${API.AUTHOR_URL}/${id}`);
        return response.data;
      } else {
        const response = await axiosClient.get(`${API.ARTICLES_URL}${API.CHANNEL_URL}/${id}`);
        return response.data;
      }
    },
    {
      staleTime: 1000 * 60,
    },
  );

  return { data, isFetching };
};
