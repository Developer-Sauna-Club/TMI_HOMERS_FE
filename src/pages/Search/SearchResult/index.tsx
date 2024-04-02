import FilteredData from '@/shared/components/FilteredData';
import { Post } from '@/type/Post';
import { User } from '@/type/User';
import NoResult from '../NoResult';

type SearchResultProps = {
  searchResList: (Post | User)[] | undefined;
  type: 'article' | 'user';
};

const SearchResult = ({ searchResList, type }: SearchResultProps) => {
  const filteredSearchResList = searchResList?.filter((searchRes) => type in searchRes);

  if (Array.isArray(filteredSearchResList) && !filteredSearchResList.length) {
    return <NoResult />;
  }

  return (
    <div className="flex flex-col gap-3">
      {filteredSearchResList && (
        <div className="font-Cafe24Surround text-[0.875rem] text-wall-street dark:text-lazy-gray">{`${filteredSearchResList.length}건의 검색 결과 `}</div>
      )}
      <div
        className={`${type === 'user' && searchResList && 'flex flex-col gap-6 pl-5 pr-5 pt-2'}`}
      >
        <FilteredData type={type} data={filteredSearchResList} />
      </div>
    </div>
  );
};

export default SearchResult;
