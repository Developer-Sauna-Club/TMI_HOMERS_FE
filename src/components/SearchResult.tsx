import { ARTICLE_TITLE_MAX_LENGTH } from '@/constants/Article';
import { useTabContext } from '@/hooks/useTabContext';
import type { SearchData } from '@/type/search';
import useFilteredSearchResult from '@hooks/useFilteredSearchResult';
import Article from './Article';
import Avatar from './Avatar';
import SubButton from './SubButton';

const SEARCH_RESULT_CLASS = 'font-Cafe24SurroundAir pl-4 pr-3 pb-[0.625rem] pt-[0.25rem]';

const SearchResult = ({ data }: SearchData) => {
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
            <span className="font-Cafe24SurroundAir">
              {index === 0 && `${filteredData.length}건의 검색결과`}
            </span>
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
            <span className="font-Cafe24SurroundAir">
              {index === 0 && `${filteredData.length}건의 검색결과`}
            </span>
            <div
              key={_id}
              className={`cursor-pointer max-w-[22.375rem] mb-[0.8rem] mt-[0.5rem] mx-auto flex items-center justify-between ${SEARCH_RESULT_CLASS}`}
            >
              <div className="flex items-center gap-4 line-clamp-1">
                <Avatar width={2.5} profileImage="" isLoggedIn={false} />
                <div className="font-Cafe24SurroundAir">
                  {fullName.length > ARTICLE_TITLE_MAX_LENGTH
                    ? `${fullName.slice(0, ARTICLE_TITLE_MAX_LENGTH)}...`
                    : fullName}
                </div>
              </div>
              <SubButton label="팔로우" color="violet" type="outline" size="small" />
            </div>
          </div>
        );
      }
      return;
    })
  );
};

export default SearchResult;
