import { useState } from 'react';
import useDebounce from '@hooks/useDebounce';
import useSearch from '@hooks/useSearch';

const DEBOUNCE_DELAY = 100;

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);
  const { data: users } = useSearch(debouncedSearchQuery);

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
          <div key={user._id} className="cursor-pointer">
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
