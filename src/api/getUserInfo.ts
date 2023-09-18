import { axiosClient } from './axiosClient';

const getUserInfo = async (userId: string) => {
  const userInfo = await axiosClient.get(`/users/${userId}`);
  return userInfo;
};

export default getUserInfo;
