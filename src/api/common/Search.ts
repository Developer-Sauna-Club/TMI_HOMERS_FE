import { Post } from '@type/Post';
import { User } from '@type/User';
import { axiosClient } from '../axiosClient';

export const searchUsers = async (query: string) => {
  const SEARCH_USERS_URL = `/search/users/${query}`;
  const { data } = await axiosClient.get<User[]>(SEARCH_USERS_URL);
  return data;
};

export const searchAllResults = async (query: string) => {
  const SEARCH_ALL_RESULTS_URL = `/search/${query}`;
  const { data } = await axiosClient.get<(User | Post)[]>(SEARCH_ALL_RESULTS_URL);
  return data;
};
