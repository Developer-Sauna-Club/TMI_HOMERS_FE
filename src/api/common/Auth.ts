import { SignUpParams } from '@/type/signUp';
import { SignUpFormValues } from '@/type/signUp';
import type { User } from '@/type/User';
import { removeItemFromStorage } from '@/utils/localStorage';
import { axiosClient } from '../axiosClient';

const SIGNUP_URL = '/signup';
const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
const CHECK_AUTH_URL = '/auth-user';

type SignUpResponseData = {
  user: User;
  token: string;
};

type LoginParams = {
  email: string;
  password: string;
};

type LoginResponseData = {
  user: User;
  token: string;
};

export const signUp = async ({
  email,
  password,
  nickname,
}: SignUpFormValues): Promise<SignUpResponseData> => {
  const signUpParams: SignUpParams = {
    email,
    password,
    fullName: nickname,
  };

  const { data } = await axiosClient.post<SignUpResponseData>(SIGNUP_URL, {
    ...signUpParams,
  });
  return data;
};

export const login = async ({ email, password }: LoginParams): Promise<LoginResponseData> => {
  const loginParams: LoginParams = {
    email,
    password,
  };

  const { data } = await axiosClient.post<LoginResponseData>(LOGIN_URL, {
    ...loginParams,
  });
  return data;
};

export const logout = () => {
  axiosClient.post(LOGOUT_URL);
  removeItemFromStorage('token');
};

export const checkAuthentication = async () => {
  const { data } = await axiosClient.get<User>(CHECK_AUTH_URL);
  return data;
};
