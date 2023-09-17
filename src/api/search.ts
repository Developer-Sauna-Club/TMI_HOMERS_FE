import type { Post } from '@/type/Post';
import type { SearchParams } from '@/type/search';
import type { User } from '@/type/User';
import { axiosClient } from './axiosClient';
const SEARCH_URL = '/search';

export const searchKeyword = async ({ keyword }: SearchParams) => {
  const { data } = await axiosClient.get<(User | Post)[]>(`${SEARCH_URL}/all/${keyword}`);

  return data;
};
