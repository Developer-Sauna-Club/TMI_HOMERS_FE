import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@type/User';
import { axiosClient } from '@api/axiosClient';
import Loader from '@components/Loader';
import useDebounce from '@hooks/useDebounce';
import { setItemToStorage, getItemFromStorage } from '@utils/localStorage'; // 로컬 스토리지 유틸리티 함수 임포트

const MAX_RECENT_SEARCHES = 10; // 최대 저장할 최근 검색어 개수
const LOCAL_STORAGE_KEY = 'recentSearches'; // 로컬 스토리지 키

// 사용자 검색 쿼리 함수
const searchUsers = async (query: string) => {
  const response = await axiosClient.get(`/search/users/${query}`);
  return response.data;
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

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

  useEffect(() => {
    // 로컬 스토리지에서 최근 검색어 불러오기
    const storedSearches = getItemFromStorage(LOCAL_STORAGE_KEY);
    if (storedSearches) {
      const parsedSearches = JSON.parse(storedSearches);
      setRecentSearches(parsedSearches);
    }
  }, []);

  // 최근 검색어 추가 함수
  const addRecentSearch = useCallback(
    (query: string) => {
      // 중복 검색어 제거
      const updatedSearches = recentSearches.filter((item) => item !== query);
      // 새로운 검색어 추가
      updatedSearches.unshift(query);
      // 최대 개수를 초과하는 경우 가장 오래된 검색어 제거
      if (updatedSearches.length > MAX_RECENT_SEARCHES) {
        updatedSearches.pop();
      }

      // 상태 업데이트 및 로컬 스토리지에 저장
      setRecentSearches(updatedSearches);
      setItemToStorage(LOCAL_STORAGE_KEY, JSON.stringify(updatedSearches));
    },
    [recentSearches],
  );

  useEffect(() => {
    // 데이터를 받아온 후 최근 검색어 추가
    if (userData) {
      addRecentSearch(debouncedSearchQuery);
    }
  }, [userData, debouncedSearchQuery, addRecentSearch]);

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
  };

  const renderRecentSearches = () => {
    return (
      <>
        <h2 className="text-white font-Cafe24Surround text-[1.5rem] text-center">최근 검색어</h2>
        <ul className="flex flex-wrap gap-3 w-full h-full">
          {recentSearches.map((search, index) => (
            <li
              className="inline h-[2rem] whitespace-nowrap cursor-pointer border border-lazy-gray rounded-xl p-1 text-center hover:bg-white hover:text-tricorn-black"
              key={index}
              onClick={() => handleRecentSearchClick(search)}
              style={{ cursor: 'pointer' }}
            >
              {search}
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center w-[100vw] h-[100vh] justify-center gap-5">
      <h1 className="text-white font-Cafe24Surround text-[2rem]">유저 검색</h1>
      <input
        className="rounded-lg w-[30%] p-2 bg-tricorn-black focus:bg-wall-street text-lazy-gray focus:text-white focus:font-bold"
        type="text"
        placeholder="검색어 입력"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="rounded-xl shadow-lg bg-tricorn-black w-[30%] p-2 flex flex-col items-center">
        {renderRecentSearches()}
      </div>
      <div>
        <h2 className="text-white font-Cafe24Surround text-[1.5rem] mt-5">유저 검색 결과</h2>
        {isFetching && (
          <div className="flex justify-center h-full w-full">
            {/* NOTE: Fetching 시간을 늘려서 로딩 화면을 조금 더 보여주게 하는 게 사용자에게 더 만족감이 있지 않을까? */}
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
