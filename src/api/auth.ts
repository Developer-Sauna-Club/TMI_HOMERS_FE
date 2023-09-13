import { getItemFromStorage } from '@/utils/localStorage';
import { axiosClient } from './axiosClient';

const CHECK_AUTH_URL = '/auth-user';

//토근을 가져와서 인증된 사용자인지 확인하는 api
export const checkAuthentication = async () => {
  const token = getItemFromStorage('token');
  if (token) {
    const { data } = await axiosClient.get(CHECK_AUTH_URL, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return data;
  }
};
