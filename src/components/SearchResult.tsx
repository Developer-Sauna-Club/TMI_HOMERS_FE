import { useTabContext } from '@/hooks/useTabContext';
import type { SearchData } from '@/type/search';
import useFilteredSearchResult from '@hooks/useFilteredSearchResult';
import Article from './Article';
import Avatar from './Avatar';
import SubButton from './SubButton';

const SearchResult = ({ data }: SearchData) => {
  const { activeTab } = useTabContext();
  const filteredData = useFilteredSearchResult({ data });

  return (
    filteredData &&
    filteredData.map((searchResult) => {
      if (activeTab === 'item1' && 'title' in searchResult) {
        const { _id, title, author, createdAt, likes, image, comments } = searchResult;
        const { fullName } = author;
        const { title: articleTitle } = title ? JSON.parse(title) : { title: '' };
        return (
          <Article
            key={_id}
            id={_id}
            title={articleTitle ? articleTitle : '제목이 없습니다.'}
            nickname={fullName ? `@${fullName}` : ''}
            postedDate={createdAt}
            hasImage={image !== undefined}
            likes={likes?.length || 0}
            comments={comments?.length || 0}
          />
        );
      } else if (activeTab === 'item2' && 'role' in searchResult) {
        const { _id, fullName } = searchResult;
        return (
          <div key={_id} className="flex justify-center items-center gap-4 pt-3">
            <Avatar width={2.5} profileImage="" isLoggedIn={false} />
            <div>{fullName}</div>
            <SubButton label="팔로우" color="violet" type="outline" size="small" />
          </div>
        );
      }
      return;
    })
  );
};

export default SearchResult;
