import { User } from '@/type/User';
import { axiosClient } from './axiosClient';

const UPDATE_USER = '/settings/update-user';
const UPDATE_PASSWORD = '/settings/update-password';

type UserInformation = {
  fullName: string;
  username: string;
};

export const updateUser = async (userInformation: UserInformation) => {
  const { data } = await axiosClient.put<User>(UPDATE_USER, userInformation);
  return data;
};

export const updatePassword = async (password: string) => {
  await axiosClient.put<User>(UPDATE_PASSWORD, { password });
};
