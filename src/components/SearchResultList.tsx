import type { SearchData } from '@type/search';
import useFilteredSearchResult from '@hooks/useFilteredSearchResult';
import { useTabContext } from '@hooks/useTabContext';
import Article from './Article';
import UserListItem from './UserListItem';

// 분리하는 거 고민..
const SearchResultString = ({
  index,
  filteredData,
}: {
  index: number;
  filteredData: SearchData['data'];
}) => {
  return (
    <span className="font-Cafe24SurroundAir">
      {index === 0 && `${filteredData?.length}건의 검색결과`}
    </span>
  );
};

const SearchResultList = ({ data }: SearchData) => {
  const { activeTab } = useTabContext();
  const filteredData = useFilteredSearchResult({ data });
  return (
    filteredData &&
    filteredData.map((searchResult, index) => {
      if (activeTab === 'item1' && 'title' in searchResult) {
        const { _id, title, author, createdAt, likes, image, comments } = searchResult;
        const { fullName } = author;
        const { title: articleTitle } = title ? JSON.parse(title) : { title: '' };
        return (
          <div key={_id}>
            {SearchResultString({ index, filteredData })}
            <Article
              id={_id}
              title={articleTitle ? articleTitle : '제목이 없습니다.'}
              nickname={fullName ? `@${fullName}` : ''}
              postedDate={createdAt}
              hasImage={image !== undefined}
              likes={likes?.length || 0}
              comments={comments?.length || 0}
            />
          </div>
        );
      } else if (activeTab === 'item2' && 'role' in searchResult) {
        const { _id, fullName } = searchResult;
        return (
          <div key={_id}>
            {SearchResultString({ index, filteredData })}
            <UserListItem fullName={fullName} id={_id} />
          </div>
        );
      }
      return;
    })
  );
};

export default SearchResultList;
