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
     const requestUrl = type === 'user' ? `${API.ARTICLES_URL}${API.AUTHOR_URL}/${id}` : 
    `${API.ARTICLES_URL}${API.CHANNEL_URL}/${id}`
    const  { data } = await axiosClient.get(requestUrl);
    return data;
    },
    {
      staleTime: 1000 * 60,
    },
  );

  return { data, isFetching };
};
