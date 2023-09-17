import { useQuery } from '@tanstack/react-query';
import { Post } from '@type/Post';
import { axiosClient } from '@api/axiosClient';
import { API } from '@constants/Article';

export const useArticles = () => {
  const { data = [], isFetching } = useQuery<Post[]>(
    ['articles'],
    async () => {
      const response = await axiosClient.get(
        `${API.ARTICLES_URL}${API.CHANNEL_URL}/${API.CHANNEL_ID}`,
      );
      return response.data;
    },
    {
      staleTime: 1000 * 1,
    },
  );

  return { data, isFetching };
};
