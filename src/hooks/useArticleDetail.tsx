import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/api/axiosClient';
import { Post } from '@/type/Post';

export const useArticleDetail = () => {
  const { pathname: url } = useLocation();
  const postId = url.split('/').pop();

  const { data, isFetching } = useQuery<Post>(
    ['article'],
    async () => {
      const response = await axiosClient.get(`/posts/${postId}`);
      return response.data;
    },
    {
      staleTime: 1000 * 5,
      cacheTime: 1000 * 5,
    },
  );

  return { data, isFetching };
};
