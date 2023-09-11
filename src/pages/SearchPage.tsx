import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@type/User';
import { axiosClient } from '@api/axiosClient';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchRegisteredUsers = async (query: string) => {
    if (!query) {
      return [];
    }
    const response = await axiosClient.get(`/search/users/${query}`);
    return response.data;
  };

  const { data: users } = useQuery<User[]>(
    [searchQuery],
    () => fetchRegisteredUsers(searchQuery!),
    {
      enabled: !!searchQuery, // searchQuery가 존재하는 경우에만 쿼리를 실행
    },
  );

  return (
    <>
      <h2 className="fixed w-1/2 text-xl font-bold text-center translate-x-1/2 bg-white border-2 border-red-500">
        검색 페이지
      </h2>
      <div className="w-1/2 h-40 pt-8 mx-auto overflow-y-scroll text-center border-2 border-red-700">
        <input
          className="border-2"
          placeholder="검색합시당"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {users?.map((user) => (
          <div key={user._id} className="cursor-pointer hover:">
            <span>
              {user.fullName} {user.email}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchPage;
