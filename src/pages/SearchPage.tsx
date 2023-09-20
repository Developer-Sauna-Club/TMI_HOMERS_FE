import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineSearch } from 'react-icons/md';
import CloseButton from '@components/CloseButton';
import HeaderText from '@components/HeaderText';
import SearchResultList from '@components/SearchResultList';
import SearchSkeleton from '@components/SearchSkeleton';
import SubButton from '@components/SubButton';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { DEBOUNCE_TIME, MINIMUM__DATA } from '@constants/Search';
import { TAB_CONSTANTS } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';
import useDebounceValue from '@hooks/useDebounce';
import useRecentResult from '@hooks/useRecentResult';
import useSearch from '@hooks/useSearch';
const INPUT_CLASS =
  'w-[23.375rem] w-full p-3.5 bg-input-white outline-none  placeholder:text-lazy-gray rounded-lg font-Cafe24SurroundAir shadow-s pl-14';

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounceValue(keyword, DEBOUNCE_TIME);
  const { data, isFetching, isSuccess } = useSearch({ keyword: debouncedKeyword });
  const recentResult = useRecentResult({ isSuccess, keyword: debouncedKeyword });
  const navigate = useNavigate();
  const handleRecentResult = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <TabContextProvider>
      <section className="max-w-[25.875rem] mx-auto h-screen flex flex-col relative dark:bg-[#1D232A]">
        <header className="bg-cooled-blue pt-[2.75rem] h-[14.375rem] dark:bg-[#1D232A]">
          <div className=" flex mb-[1.25rem] ml-[1.9rem] mr-[1.56rem] justify-between items-center">
            <HeaderText label="검색" />
            <CloseButton onClick={() => navigate(-1)} />
          </div>
          <div className="flex justify-center">
            <div className="bg-white w-[23.575rem] rounded-lg">
              <form className="flex relative items-center " onSubmit={(e) => e.preventDefault()}>
                <MdOutlineSearch className="w-[1.8rem] h-[1.8rem] cursor-pointer absolute left-4" />
                <input
                  className={INPUT_CLASS}
                  placeholder="검색어를 입력해주세요"
                  value={keyword}
                  onChange={(e) => {
                    handleRecentResult(e.target.value);
                  }}
                />
              </form>
              <div className="pt-[1.63rem]">
                <Tab
                  maxWidth="23.375"
                  defaultTab="item1"
                  tabItems={[
                    { title: `${TAB_CONSTANTS.ARTICLE_TITLE}`, width: '11.6875' },
                    { title: `${TAB_CONSTANTS.NICKNAME}`, width: '11.6875' },
                  ]}
                />
              </div>
            </div>
          </div>
        </header>
        <article className="flex-grow gap-4 overflow-y-auto pb-[4.75rem]">
          <TabItem index="item1">
            {isFetching ? (
              <SearchSkeleton SkeletonType={'title'} />
            ) : (
              <SearchResultList data={data} />
            )}
          </TabItem>
          <TabItem index="item2">
            {isFetching ? (
              <SearchSkeleton SkeletonType={'user'} />
            ) : (
              <SearchResultList data={data} />
            )}
          </TabItem>
        </article>
        {(!data || data.length <= MINIMUM__DATA) && !isFetching && (
          <footer className="mb-8 mt-8 ml-[1.9rem] mr-[1.56rem]">
            <h2 className="font-Cafe24Surround text-[1.125rem]">최근 검색어</h2>
            <hr className="mt-2 mb-5" />
            <div className="flex flex-wrap gap-2">
              {recentResult.map((item, index) => (
                <div key={index}>
                  <SubButton
                    size="medium"
                    radius="medium"
                    label={item}
                    color="blue"
                    type="outline"
                    onClick={() => handleRecentResult(item)}
                  />
                </div>
              ))}
            </div>
          </footer>
        )}
      </section>
    </TabContextProvider>
  );
};

export default SearchPage;
