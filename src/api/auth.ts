import type { User } from '@/types/User';
import { getItemFromStorage } from '@/utils/localStorage';
import { axiosClient } from './axiosClient';

const CHECK_AUTH_URL = '/auth-user';

export const checkAuthentication = async () => {
  const { data } = await axiosClient.get<User>(CHECK_AUTH_URL, {
    headers: {
      Authorization: `Bearer ${getItemFromStorage('token')}`,
    },
  });
  return data;
};
