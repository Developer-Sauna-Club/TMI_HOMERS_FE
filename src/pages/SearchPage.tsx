import { useForm } from 'react-hook-form';
import { BiSearchAlt2 } from 'react-icons/bi';
import HeaderText from '@/components/HeaderText';
import SearchResult from '@/components/SearchResult';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { TabConstants } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';
import useDebounceValue from '@hooks/useDebounce';
import useSearch from '@hooks/useSearch';

const SearchPage = () => {
  const { register, watch } = useForm();
  const keyword = watch('keyword');
  const debouncedKeyword = useDebounceValue(keyword, 1000);
  const { data } = useSearch({ keyword: debouncedKeyword });
  return (
    <>
      <TabContextProvider>
        <HeaderText label="검색" />
        <form>
          <BiSearchAlt2 />
          <input placeholder="검색어를 입력해주세요" {...register('keyword')} />
        </form>
        <Tab
          maxWidth="23.375"
          tabItems={[
            { title: `${TabConstants.ARTICLE_TITLE}`, width: '11.6875' },
            { title: `${TabConstants.NICKNAME}`, width: '11.6875' },
          ]}
        />
        <TabItem title={`${TabConstants.NEWEST}`} index="item1">
          <SearchResult data={data} />
        </TabItem>
        <TabItem title={`${TabConstants.SUBSCRIBED}`} index="item2">
          <SearchResult data={data} />
        </TabItem>
      </TabContextProvider>
    </>
  );
};

export default SearchPage;
