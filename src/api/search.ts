import { Post } from '@/types/Post';
import type { User } from '@/types/User';
import { axiosClient } from './axiosClient';

const SEARCH_URL = '/search';

type SearchParams = {
  mode?: 'all' | 'users';
  keyword: string;
};

export const fetchSearchAllResultsByKeyword = async ({ mode = 'all', keyword }: SearchParams) => {
  const { data } = await axiosClient.get<(User | Post)[]>(`${SEARCH_URL}/${mode}/${keyword}`);
  return data;
};
