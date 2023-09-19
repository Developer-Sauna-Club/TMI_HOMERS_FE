import { User } from '@/type/User';
import { axiosClient } from '../axiosClient';

const UPDATE_USER = '/settings/update-user';
const UPDATE_PASSWORD = '/settings/update-password';

type UserInformation = {
  fullName: string;
  username: string;
};

export const updateUser = async (data: UserInformation) => {
  await axiosClient.put<User>(UPDATE_USER, data);
};

export const updatePassword = async (password: string) => {
  await axiosClient.put<User>(UPDATE_PASSWORD, { password });
};
