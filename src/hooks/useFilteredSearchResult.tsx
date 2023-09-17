import type { SearchData } from '@/type/search';

import { useTabContext } from './useTabContext';

const useFilteredSearchResult = ({ data }: SearchData) => {
  const { activeTab } = useTabContext();
  const filteredData =
    activeTab === 'item1'
      ? data?.filter((searchResult) => 'title' in searchResult)
      : data?.filter((searchResult) => 'role' in searchResult);

  return filteredData;
};

export default useFilteredSearchResult;
