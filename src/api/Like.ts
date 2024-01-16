import { Like } from '@/type/Like';
import { axiosClient } from './axiosClient';

export const likePost = async (postId: string) => {
  const LIKE_POST_URL = '/likes/create';
  const { data } = await axiosClient.post<Like>(LIKE_POST_URL, { postId });
  return data;
};

export const deleteLikePost = async (id: string) => {
  const LIKE_POST_URL = '/likes/delete';
  const { data } = await axiosClient.delete<Like>(LIKE_POST_URL, {
    data: {
      id,
    },
  });
  return data;
};
