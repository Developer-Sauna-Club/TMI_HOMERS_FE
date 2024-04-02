import { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { Header } from '@/components';
import Tabs from '@/components/Tabs';
import { DEBOUNCE_TIME, MINIMUM__DATA } from '@/constants/Search';
import useDebounceValue from '@/hooks/useDebounce';
import useRecentResult from '@/hooks/useRecentResult';
import useSearch from '@/hooks/useSearch';
import RecentResult from '../RecentResult';
import SearchResult from '../SearchResult';

const SEARCH_RESULT_TABS = [
  {
    INDEX: 0,
    VALUE: 'article',
    LABEL: '글 제목',
  },
  {
    INDEX: 1,
    VALUE: 'user',
    LABEL: '닉네임',
  },
] as const;

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounceValue(keyword, DEBOUNCE_TIME);
  const { data, isFetching, isSuccess } = useSearch({ keyword: debouncedKeyword });
  const recentResult = useRecentResult({ isSuccess, keyword: debouncedKeyword });

  const isNotEnoughData = (!data || data.length <= MINIMUM__DATA) && !isFetching;

  const handleRecentResult = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <Tabs defaultValue="article">
      <section className="max-w-[25.875rem] mx-auto h-screen w-screen flex flex-col font-Cafe24SurroundAir">
        <div className="bg-cooled-blue dark:bg-dark-primary flex flex-col pt-[2.75rem] pl-6 pr-6 gap-4">
          <Header label="search" type="close" />
          <div className="bg-input-white rounded-lg flex flex-col gap-4 pt-1">
            <div className="flex items-center pl-4">
              <MdOutlineSearch className="w-[1.8rem] h-[1.8rem] cursor-pointer text-tricorn-black" />
              <input
                className="w-[90%] p-3.5 outline-none placeholder:text-lazy-gray"
                placeholder="검색어를 입력해주세요"
                value={keyword}
                onChange={(e) => {
                  handleRecentResult(e.target.value);
                }}
              />
            </div>
            <Tabs.List>
              {SEARCH_RESULT_TABS.map(({ VALUE, LABEL, INDEX }) => (
                <Tabs.Tab value={VALUE} key={INDEX}>
                  {LABEL}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </div>
        </div>
        <div className=" overflow-y-auto pl-5 pr-5 pt-7 flex flex-col gap-5">
          {SEARCH_RESULT_TABS.map(({ VALUE, INDEX }) => (
            <Tabs.Panel key={INDEX} value={VALUE}>
              <SearchResult searchResList={data} type={VALUE} />
            </Tabs.Panel>
          ))}
          {isNotEnoughData && (
            <RecentResult
              recentResult={recentResult}
              onClick={(item) => handleRecentResult(item)}
            />
          )}
        </div>
      </section>
    </Tabs>
  );
};

export default SearchPage;
