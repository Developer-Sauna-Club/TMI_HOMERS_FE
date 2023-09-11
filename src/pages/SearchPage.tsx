import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@type/User';
import { axiosClient } from '@api/axiosClient';
import Loader from '@components/Loader';
import useDebounce from '@hooks/useDebounce';

// 사용자 검색 쿼리 함수
const searchUsers = async (query: string) => {
  const response = await axiosClient.get(`/search/users/${query}`);
  return response.data;
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태
  const debouncedSearchQuery = useDebounce(searchQuery, 1000); // 검색어를 디바운스

  const {
    data: userData,
    isFetching,
    isError,
  } = useQuery(
    [
      'users',
      debouncedSearchQuery,
      {
        staleTime: 5000,
      },
    ],
    () => searchUsers(debouncedSearchQuery),
    {
      enabled: Boolean(debouncedSearchQuery), // 검색어가 있을 때만 요청 보냄
    },
  );

  return (
    <div className="flex flex-col items-center w-[100vw] h-[100vh] justify-center">
      <h1 className="font-Cafe24Surround text-[2rem]">유저 검색</h1>
      <input
        className="rounded-lg w-[30%] p-2 bg-tricorn-black focus:bg-wall-street text-lazy-gray focus:text-white focus:font-bold"
        type="text"
        placeholder="검색어 입력"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <h2 className="font-Cafe24Surround text-[1.5rem] mt-5">유저 검색 결과</h2>
        {isFetching && (
          <div className="flex justify-center h-full w-full">
            <Loader size="lg" />
          </div>
        )}
        {userData && (
          <ul className="">
            {userData.length !== 0 ? (
              userData.map((user: User) => (
                <li
                  className="border border-lazy-gray rounded-xl p-1 my-3 text-center"
                  key={user._id}
                >
                  {user.fullName}
                </li>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </ul>
        )}
        {isError && <p>에러 발생!</p>}
      </div>
    </div>
  );
};

export default SearchPage;
