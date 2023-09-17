import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { axiosClient } from '@/api/axiosClient';
import { Post } from '@/type/Post';

export const useArticleDetail = () => {
  const { data, isFetching } = useQuery<AxiosResponse<Post>>(
    ['article'],
    async () => {
      const response = await axiosClient.get('posts/65069ea19fae952aa0cfbf9b');
      return response;
    },
    {
      staleTime: 1000 * 5,
    },
  );

  return { data, isFetching };
};
