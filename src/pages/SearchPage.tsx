import { useState, ChangeEvent, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/api/axiosClient';

// 얘도 분리..
const fetchSearchResult = async (query: string) => {
  const res = await axiosClient.get(`/search/users/${query}`);
  return res.data;
};

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const { data } = useQuery([debouncedKeyword], () => fetchSearchResult(debouncedKeyword), {
    enabled: !!debouncedKeyword,
  });

  // 추후 커스텀 훅으로 분리
  useEffect(() => {
    const DELAY = 300;
    const timeoutId = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, DELAY);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [keyword]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // data타입 : user[] | post[]
  // 이상한 글자 들어가도 200뜬당 (/는 404)
  // 소문자 대문자 구별한건지...?
  // 오류 처리..중요..흠냐
  return (
    <>
      <input type="text" placeholder="검색어를 입력해주세요" onChange={handleSearch} />
      {data &&
        data.map(({ _id }: { _id: string }) => {
          return <div key={_id}>{_id}</div>;
        })}
    </>
  );
};

export default SearchPage;
