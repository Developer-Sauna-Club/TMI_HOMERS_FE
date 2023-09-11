import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/api/axiosClient';

type User = {
  _id: string;
  fullName: string;
  email: string;
};

const SearchPage = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('');

  const fetchUsers = async (query: string) => {
    if (!query) {
      return [];
    }
    const response = await axiosClient.get(`/search/users/${query}`);

    return response.data;
  };

  const { data: users } = useQuery<User[]>(
    [debouncedInputValue],
    () => fetchUsers(debouncedInputValue),
    {
      enabled: !!debouncedInputValue,
    },
  );

  useEffect(() => {
    //입력값이 변경될 때마다 타이머 재설정
    const debounceTimer = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  return (
    <div className="flex flex-col justify-center items-center pt-5">
      <h2 className="w-1/2 text-center border-2">검색 페이지</h2>
      <div className="w-1/2 h-44 pt-5 mt-5 mx-auto overflow-y-scroll text-center border-2">
        <input
          className="border-2"
          placeholder="유저를 검색하세요"
          onChange={(e) => setInputValue(e.target.value)}
        />
        {users?.map((user) => (
          <div key={user._id} className="cursor-pointer hover:">
            <span>
              {user.fullName} {user.email}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
