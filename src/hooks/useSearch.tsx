import { useQuery } from '@tanstack/react-query';
import { User } from '@type/User';
import { axiosClient } from '@api/axiosClient';

const useSearch = (query: string) => {
  const fetchRegisteredUsers = async (query: string) => {
    if (!query) {
      return [];
    }
    const response = await axiosClient.get(`/search/users/${query}`);
    return response.data;
  };

  return useQuery<User[]>(['searchUsers', query], () => fetchRegisteredUsers(query), {
    enabled: !!query,
  });
};

export default useSearch;
