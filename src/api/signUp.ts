import { SignUpFormValues, SignUpParams } from '@/types/signUp';
import type { User } from '@/types/User';
import { axiosClient } from './axiosClient';

const SIGNUP_URL = '/signup';

type SignUpResponseData = {
  user: User;
  token: string;
};

// 회원가입하는 api
export const signUp = async ({
  email,
  password,
  fullName,
}: SignUpFormValues): Promise<SignUpResponseData> => {
  const signUpParams: SignUpParams = {
    email,
    password,
    fullName,
  };

  const { data } = await axiosClient.post<SignUpResponseData>(SIGNUP_URL, {
    ...signUpParams,
  });
  return data;
};
