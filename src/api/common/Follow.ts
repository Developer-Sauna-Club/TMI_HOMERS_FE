import type { Follow } from '@type/Follow';
import { axiosClient } from '../axiosClient';

export const followUser = async (userId: string) => {
  const FOLLOW_URL = '/follow/create';
  const { data } = await axiosClient.post<Follow>(FOLLOW_URL, { userId });
  return data;
};

export const unFollowUser = async (userId: string) => {
  const UN_FOLLOW_URL = '/follow/delete';
  const { data } = await axiosClient.delete<Follow>(UN_FOLLOW_URL, {
    data: {
      userId,
    },
  });
  return data;
};
