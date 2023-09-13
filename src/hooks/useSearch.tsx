import { useQuery } from '@tanstack/react-query';
import { User } from '@type/User';
import { axiosClient } from '@api/axiosClient';

const useSearch = (query: string) => {
  const fetchRegisteredUsers = async (query: string) => {
    const response = await axiosClient.get(`/search/users/${query}`);
    return response.data;
  };

  return useQuery<User[]>(['searchUsers', query], () => fetchRegisteredUsers(query), {
    enabled: !!query,
    staleTime: 1000 * 60 * 1,
  });
};

export default useSearch;
