import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSearchAllResultsByKeyword } from '@/api/search';
import useDebounceValue from '@/hooks/useDebounce';
import type { Post } from '@/types/Post';
import type { User } from '@/types/User';

type SearchForm = {
  keyword: string;
};

type SearchMode = 'all' | 'users';

type SearchParams = {
  mode?: SearchMode;
  keyword: string;
};

const useSearchAll = ({ mode, keyword }: SearchParams) => {
  const { data: searchResults, isLoading } = useQuery<(User | Post)[]>(
    ['search', mode, keyword],
    () => fetchSearchAllResultsByKeyword({ mode, keyword }),
    {
      enabled: !!keyword,
    },
  );
  return { searchResults, isLoading };
};

const SearchPage = () => {
  const [mode, setMode] = useState<SearchMode>('all');
  const { watch, register, handleSubmit } = useForm<SearchForm>({
    defaultValues: {
      keyword: '',
    },
  });

  const keyword = watch('keyword');
  const debouncedKey = useDebounceValue(keyword, 1000);
  const { searchResults, isLoading } = useSearchAll({ mode, keyword: debouncedKey });
  const queryClient = useQueryClient();

  const onSubmit = () => {
    queryClient.invalidateQueries(['search']);
  };

  return (
    <div className="flex flex-col justify-center">
      <header className="flex">
        <h1>검색 페이지</h1>
        <div className="flex">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('keyword')} />
            <button>검색</button>
          </form>
        </div>
      </header>
      <div>
        <button onClick={() => setMode('all')}>ALL</button>
        <button onClick={() => setMode('users')}>USER</button>
        <p>{mode} 모드</p>
        <h2>검색 결과</h2>
        {isLoading && <p>로딩 중...</p>}
        <ul>
          {searchResults?.map((searchResult) => (
            <li key={JSON.stringify(searchResult)}>{JSON.stringify(searchResult)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
