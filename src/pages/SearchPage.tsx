import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineSearch } from 'react-icons/md';
import { CloseButton, HeaderText, SearchSkeleton, SubButton, Tab, TabItem } from '@/components';
import { useRecentResult, useSearch, useTab } from '@/hooks';
import useDebounceValue from '@/hooks/useDebounce';
import { getItemFromStorage, setItemToStorage } from '@/utils/localStorage';
import { DEBOUNCE_TIME, MINIMUM__DATA } from '@constants/Search';
import { CURRENT_SEARCH_TAB_KEY, TAB_CONSTANTS } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';
import SearchResultList from './SearchPage/SearchResultList';
const INPUT_CLASS =
  'w-[90%] p-3.5 bg-input-white outline-none placeholder:text-lazy-gray rounded-lg font-Cafe24SurroundAir shadow-s pl-14';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounceValue(keyword, DEBOUNCE_TIME);
  const { data, isFetching, isSuccess } = useSearch({ keyword: debouncedKeyword });
  const recentResult = useRecentResult({ isSuccess, keyword: debouncedKeyword });
  const navigate = useNavigate();
  const { currentTab, changeTab } = useTab(CURRENT_SEARCH_TAB_KEY);
  const handleRecentResult = (keyword: string) => {
    setKeyword(keyword);
  };

  const isNotEnoughData = (!data || data.length <= MINIMUM__DATA) && !isFetching;

  useEffect(() => {
    const savedTab = getItemFromStorage(CURRENT_SEARCH_TAB_KEY);
    savedTab
      ? changeTab(savedTab)
      : setItemToStorage(TAB_CONSTANTS.ARTICLE_TITLE, TAB_CONSTANTS.ARTICLE_TITLE);
  }, [currentTab, changeTab]);
  return (
    <TabContextProvider>
      <section className="max-w-[25.875rem] mx-auto h-screen w-screen flex flex-col relative">
        <header className="bg-cooled-blue dark:bg-dark-primary pt-[2.75rem] h-[14.375rem]">
          <div className="flex mb-[1.25rem] ml-[1.9rem] mr-[1.56rem] justify-between items-center">
            <HeaderText label="검색" />
            <CloseButton onClick={() => navigate(-1)} />
          </div>
          <div className="flex justify-center">
            <div className="bg-white w-[90%] rounded-lg">
              <form className="flex relative items-center " onSubmit={(e) => e.preventDefault()}>
                <MdOutlineSearch className="w-[1.8rem] h-[1.8rem] cursor-pointer absolute left-4 text-tricorn-black" />
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
                  active={currentTab}
                  maxWidth="23.375"
                  defaultTab={`${TAB_CONSTANTS.ARTICLE_TITLE}`}
                  tabItems={[
                    {
                      title: `${TAB_CONSTANTS.ARTICLE_TITLE}`,
                      width: '11.6875',
                      onClick: () => changeTab(TAB_CONSTANTS.ARTICLE_TITLE),
                    },
                    {
                      title: `${TAB_CONSTANTS.NICKNAME}`,
                      width: '11.6875',
                      onClick: () => changeTab(TAB_CONSTANTS.NICKNAME),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </header>
        {data && (
          <article className="gap-4 pt-6 overflow-y-auto">
            <TabItem index={`${TAB_CONSTANTS.ARTICLE_TITLE}`}>
              {isFetching ? (
                <SearchSkeleton SkeletonType={'title'} />
              ) : (
                <SearchResultList data={data} />
              )}
            </TabItem>
            <TabItem index={`${TAB_CONSTANTS.NICKNAME}`}>
              {isFetching ? (
                <SearchSkeleton SkeletonType={'user'} />
              ) : (
                <SearchResultList data={data} />
              )}
            </TabItem>
          </article>
        )}
        {isNotEnoughData && (
          <footer className="mb-8 mt-8 ml-[1.9rem] mr-[1.56rem]">
            <h2 className="font-Cafe24Surround text-[1.125rem] text-tricorn-black dark:text-extra-white">
              최근 검색어
            </h2>
            <hr className="mt-2 mb-5" />
            <div className="flex flex-wrap gap-2">
              {recentResult.map((item, index) => (
                <div key={index}>
                  <SubButton
                    size="small"
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
