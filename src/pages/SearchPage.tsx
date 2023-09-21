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
import useTab from '@hooks/useTab';
const INPUT_CLASS =
  'w-[23.375rem] w-full p-3.5 bg-input-white outline-none  placeholder:text-lazy-gray rounded-lg font-Cafe24SurroundAir shadow-s pl-14';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounceValue(keyword, DEBOUNCE_TIME);
  const { data, isFetching, isSuccess } = useSearch({ keyword: debouncedKeyword });
  const recentResult = useRecentResult({ isSuccess, keyword: debouncedKeyword });
  const navigate = useNavigate();
  const { changeTab } = useTab();
  const handleRecentResult = (keyword: string) => {
    setKeyword(keyword);
  };

  const isNotEnoughData = (!data || data.length <= MINIMUM__DATA) && !isFetching;
  return (
    <TabContextProvider>
      <section className="max-w-[25.875rem] mx-auto h-screen flex flex-col relative">
        <header className="bg-cooled-blue dark:bg-dark-primary pt-[2.75rem] h-[14.375rem]">
          <div className=" flex mb-[1.25rem] ml-[1.9rem] mr-[1.56rem] justify-between items-center">
            <HeaderText label="검색" />
            <CloseButton onClick={() => navigate(-1)} />
          </div>
          <div className="flex justify-center">
            <div className="bg-white w-[23.575rem] rounded-lg">
              <form className="flex relative items-center " onSubmit={(e) => e.preventDefault()}>
                <MdOutlineSearch className="w-[1.8rem] h-[1.8rem] cursor-pointer absolute left-4 text-black" />
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
          <article className="gap-4 overflow-y-auto pt-6">
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
            <h2 className="font-Cafe24Surround text-[1.125rem] text-black dark:text-extra-white">
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
