import type { SearchData } from '@type/search';
import { useFilteredSearchResult, useTabContext } from '@/hooks';
import Article from '@components/Article';
import { SearchType } from '@constants/Search';
import { TAB_CONSTANTS } from '@constants/Tab';
import UserListItem from './UserListItem';

const searchResultString =
  'font-Cafe24Surround text-[0.875rem] ml-10 pb-2 text-wall-street dark:text-lazy-gray';

const SearchResultList = ({ data }: SearchData) => {
  const { activeTab } = useTabContext();
  const filteredData = useFilteredSearchResult({ data });
  return filteredData && filteredData.length > 0 ? (
    filteredData.map((searchResult, index) => {
      if (activeTab === TAB_CONSTANTS.ARTICLE_TITLE && SearchType.TITLE in searchResult) {
        const { _id, title, author, createdAt, likes, image, comments } = searchResult;
        const { fullName } = author;
        try {
          const { title: articleTitle } = title ? JSON.parse(title) : { title: '' };
          return (
            <div key={_id}>
              {index === 0 && (
                <div className={searchResultString}>{`${filteredData?.length}건의 검색결과`}</div>
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
        } catch (e) {
          //JSON 문자열의 형식이 올바르지 않을 때
          alert(e);
        }
      } else if (activeTab === TAB_CONSTANTS.NICKNAME && SearchType.ROLE in searchResult) {
        const { _id, fullName, image } = searchResult;
        return (
          <div key={_id}>
            {index === 0 && (
              <div className={searchResultString}>{`${filteredData?.length}건의 검색결과`}</div>
            )}
            <UserListItem fullName={fullName} id={_id} image={image ? image : ''} />
          </div>
        );
      }
      return;
    })
  ) : (
    <div className="font-Cafe24SurroundAir ml-[1.9rem] mr-[1.56rem]">검색결과가 없습니다.</div>
  );
};

export default SearchResultList;
