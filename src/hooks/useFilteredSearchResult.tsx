import type { SearchData } from '@type/search';
import { SearchType } from '@constants/Search';
import { useTabContext } from './useTabContext';

const useFilteredSearchResult = ({ data }: SearchData) => {
  const { activeTab } = useTabContext();
  const filteredData =
    activeTab === 'item1'
      ? data?.filter((searchResult) => SearchType.TITLE in searchResult)
      : data?.filter((searchResult) => SearchType.ROLE in searchResult);

  return filteredData;
};

export default useFilteredSearchResult;
