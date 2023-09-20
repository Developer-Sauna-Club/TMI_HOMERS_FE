import type { SearchData } from '@type/search';
import { SearchType } from '@constants/Search';
import useFilteredSearchResult from '@hooks/useFilteredSearchResult';
import { useTabContext } from '@hooks/useTabContext';
import Article from './Article';
import UserListItem from './UserListItem';

const SearchResultList = ({ data }: SearchData) => {
  const { activeTab } = useTabContext();
  const filteredData = useFilteredSearchResult({ data });
  return (
    filteredData &&
    filteredData.map((searchResult, index) => {
      if (activeTab === 'item1' && SearchType.TITLE in searchResult) {
        const { _id, title, author, createdAt, likes, image, comments } = searchResult;
        const { fullName } = author;
        const { title: articleTitle } = title ? JSON.parse(title) : { title: '' };
        return (
          <div key={_id}>
            {index === 0 && (
              <span className="font-Cafe24Surround  text-[0.875rem] ml-6">{`${filteredData?.length}건의 검색결과`}</span>
            )}
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
      } else if (activeTab === 'item2' && SearchType.ROLE in searchResult) {
        const { _id, fullName, image } = searchResult;
        return (
          <div key={_id}>
            {index === 0 && (
              <span className="font-Cafe24Surround  text-[0.875rem] ml-6">{`${filteredData?.length}건의 검색결과`}</span>
            )}
            <UserListItem fullName={fullName} id={_id} image={image ? image : ''} />
          </div>
        );
      }
      return;
    })
  );
};

export default SearchResultList;
