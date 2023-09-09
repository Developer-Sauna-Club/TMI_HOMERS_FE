import { AxiosResponse } from 'axios';
import type { SignUpFormValues, SignUpParams } from '@/types/signUp';
import type { User } from '@/types/User';
import { axiosClient } from './axiosClient';

const SIGNUP_URL = '/signup';

type SignUpResponseData = {
  user: User;
  token: string;
};

export const signUp = async ({ email, password, nickname }: SignUpFormValues) => {
  const signUpParams: SignUpParams = {
    email,
    password,
    fullName: nickname,
  };
  const { data } = await axiosClient.post<AxiosResponse<SignUpResponseData>>(SIGNUP_URL, {
    ...signUpParams,
  });
  return data;
};
