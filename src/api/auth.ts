import type { User } from '@/type/User';
import { axiosClient } from './axiosClient';

const CHECK_AUTH_URL = '/auth-user';

export const checkAuthentication = async () => {
  const response = await axiosClient.get<User>(CHECK_AUTH_URL);
  return response.data;
};
