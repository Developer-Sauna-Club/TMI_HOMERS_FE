import type { User } from '@/type/User';
import { axiosClient } from './axiosClient';

const LOGIN_URL = '/login';

type LoginParams = {
  email: string;
  password: string;
};

type LoginResponseData = {
  user: User;
  token: string;
};

export const Login = async ({ email, password }: LoginParams): Promise<LoginResponseData> => {
  const loginParams: LoginParams = {
    email,
    password,
  };

  const { data } = await axiosClient.post<LoginResponseData>(LOGIN_URL, {
    ...loginParams,
  });
  return data;
};
