import { useForm } from 'react-hook-form';
import { MdOutlineSearch } from 'react-icons/md';
import CloseButton from '@/components/CloseButton';
import HeaderText from '@/components/HeaderText';
import SearchResult from '@/components/SearchResult';
import Skeleton from '@/components/Skeleton';
import UserSkeleton from '@/components/Skeleton/UserSkeleton';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { TabConstants } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';
import useDebounceValue from '@hooks/useDebounce';
import useSearch from '@hooks/useSearch';

const INPUT_CLASS =
  'w-[23.375rem] w-full p-3.5 bg-input-white outline-none  placeholder:text-lazy-gray rounded-lg font-Cafe24SurroundAir shadow-s pl-14';
const numberOfSkeletons = 6;

const SearchPage = () => {
  const { register, watch } = useForm();
  const keyword = watch('keyword');
  const debouncedKeyword = useDebounceValue(keyword, 1000);
  const { data, isFetching } = useSearch({ keyword: debouncedKeyword });

  return (
    <TabContextProvider>
      <section className="max-w-[25.875rem] mx-auto h-screen flex flex-col relative">
        <header className="bg-cooled-blue pt-[2.75rem] h-[14.375rem]">
          <div className=" flex mb-[1.25rem] ml-[1.9rem] mr-[1.56rem] justify-between items-center">
            <HeaderText label="검색" />
            <CloseButton />
          </div>
          <div className="flex justify-center">
            <div className="bg-white w-[23.375rem] rounded-lg">
              <form className="flex relative items-center ">
                <MdOutlineSearch className="w-[1.8rem] h-[1.8rem] cursor-pointer absolute left-4" />
                <input
                  className={INPUT_CLASS}
                  placeholder="검색어를 입력해주세요"
                  {...register('keyword')}
                />
              </form>
              <div className="pt-[1.63rem]">
                <Tab
                  maxWidth="23.375"
                  tabItems={[
                    { title: `${TabConstants.ARTICLE_TITLE}`, width: '11.6875' },
                    { title: `${TabConstants.NICKNAME}`, width: '11.6875' },
                  ]}
                />
              </div>
            </div>
          </div>
        </header>
        <article className="flex-grow gap-4 overflow-y-auto pb-[4.75rem]">
          <TabItem title={`${TabConstants.NEWEST}`} index="item1">
            {isFetching ? (
              <div className="max-w-[22.375rem] pl-4 pr-3 pb-[0.625rem] pt-[0.25rem] mb-[0.8rem] mt-[0.5rem] mx-auto">
                {Array.from({ length: numberOfSkeletons }, (_, index) => (
                  <div key={index} className="pt-5">
                    <Skeleton.Paragraph />
                  </div>
                ))}
              </div>
            ) : (
              <SearchResult data={data} />
            )}
          </TabItem>
          <TabItem title={`${TabConstants.SUBSCRIBED}`} index="item2">
            {isFetching ? (
              <div className="max-w-[22.375rem] pl-4 pr-3 pb-[0.625rem] pt-[0.25rem] mb-[0.8rem] mt-[0.5rem] mx-auto">
                {Array.from({ length: numberOfSkeletons }, (_, index) => (
                  <div key={index} className="pt-5">
                    <UserSkeleton />
                  </div>
                ))}
              </div>
            ) : (
              <SearchResult data={data} />
            )}
          </TabItem>
        </article>
      </section>
    </TabContextProvider>
  );
};

export default SearchPage;
