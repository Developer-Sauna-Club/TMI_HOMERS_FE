import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/api/axiosClient';
import { Post } from '@/type/Post';

export const useArticleDetail = () => {
  const { data, isFetching } = useQuery<Post>(
    ['article'],
    async () => {
      const response = await axiosClient.get('posts/65069ea19fae952aa0cfbf9b');
      return response.data;
    },
    {
      staleTime: 1000 * 5,
    },
  );

  return { data, isFetching };
};
