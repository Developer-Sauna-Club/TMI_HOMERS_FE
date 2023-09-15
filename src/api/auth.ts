import type { User } from '@/type/User';
import { getItemFromStorage } from '@utils/localStorage';
import { axiosClient } from './axiosClient';

const CHECK_AUTH_URL = '/auth-user';

export const checkAuthentication = async () => {
  const token = getItemFromStorage('token');
  if (token) {
    const { data } = await axiosClient.get<User>(CHECK_AUTH_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
};
