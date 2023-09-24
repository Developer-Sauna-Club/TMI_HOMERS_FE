import { User } from '@/type/User';
import { axiosClient } from '../axiosClient';

const FETCH_ALL_USER_URL = '/users/get-users';

type FetchUsersParams = {
  offset: number;
  limit: number;
};

export const fetchAllUsers = async ({ offset, limit }: Partial<FetchUsersParams>) => {
  const { data } = await axiosClient.get<User>(FETCH_ALL_USER_URL, {
    params: {
      offset,
      limit,
    },
  });
  return data;
};

export const fetchUser = async (userId: string) => {
  const FETCH_USER_URL = `/users/${userId}`;
  const { data } = await axiosClient.get<User>(FETCH_USER_URL);
  return data;
};

export const updateProfileImage = async (image: File) => {
  const UPDATE_IMAGE_URL = '/users/upload-photo';
  const formData = new FormData();
  formData.append('image', image);
  formData.append('isCover', JSON.stringify(false));

  const { data } = await axiosClient.post<User>(UPDATE_IMAGE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
