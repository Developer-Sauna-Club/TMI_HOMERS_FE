import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { BiSearchAlt2 } from 'react-icons/bi';
import type { Post } from '@/type/Post';
import type { SearchType } from '@/type/search';
import type { User } from '@/type/User';
import Article from '@components/Article';
import useDebounceValue from '@hooks/useDebounce';
import useSearch from '@hooks/useSearch';

const SearchPage = () => {
  const { register, watch } = useForm();
  const keyword = watch('keyword');
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [filteredData, setFilteredData] = useState<(User | Post)[] | undefined>([]);
  const debouncedKeyword = useDebounceValue(keyword, 1000);
  const { data, isFetching } = useSearch({ type: searchType, keyword: debouncedKeyword });

  const filteredSearchResult = useCallback(() => {
    const filteredData =
      searchType === 'all' ? data?.filter((searchResult) => 'title' in searchResult) : data;
    setFilteredData(filteredData);
  }, [data, searchType]);

  // 추후 컴포넌트로 분리
  const renderSearchResult = (filteredData: (User | Post)[] | undefined) => {
    return filteredData?.map((searchResult) => {
      if (searchType === 'all' && 'title' in searchResult) {
        const { _id, title, author, createdAt, likes, image, comments } = searchResult;
        const { fullName } = author;
        const { title: articleTitle } = title ? JSON.parse(title) : { title: '' };
        return (
          <Article
            key={_id}
            id={_id}
            title={articleTitle ? articleTitle : '제목이 없습니다.'}
            nickname={fullName ? `@${fullName}` : ''}
            postedDate={createdAt}
            hasImage={image !== undefined}
            likes={likes?.length || 0}
            comments={comments?.length || 0}
          />
        );
      } else if (searchType === 'users' && 'role' in searchResult) {
        const { _id, fullName } = searchResult;
        return <div key={_id}>{fullName}</div>;
      }
      return;
    });
  };

  useEffect(() => {
    filteredSearchResult();
  }, [searchType, data, filteredSearchResult]);

  return (
    <>
      <form>
        <BiSearchAlt2 />
        <input placeholder="검색어를 입력해주세요" {...register('keyword')} />
      </form>
      <button onClick={() => setSearchType('all')}>글 제목</button>
      <button onClick={() => setSearchType('users')}>닉네임</button>
      {isFetching ? <div>로딩중..</div> : renderSearchResult(filteredData)}
    </>
  );
};

export default SearchPage;
