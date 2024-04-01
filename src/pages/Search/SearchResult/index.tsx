import Article from '@/components/Article';
import { Post } from '@/type/Post';
import { User } from '@/type/User';
import NoResult from '../NoResult';
import UserItem from '../UserItem';

type SearchResultProps = {
  searchResList: (Post | User)[] | undefined;
  type: 'title' | 'role';
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
        className={`${type === 'role' && searchResList && 'flex flex-col gap-6 pl-5 pr-5 pt-2'}`}
      >
        {filteredSearchResList?.map((searchRes) => {
          if (type === 'title') {
            const { _id, title, author, createdAt, likes, image, comments } = searchRes as Post;
            const { title: articleTitle } = title ? JSON.parse(title) : { title: '' };

            return (
              <Article
                key={_id}
                id={_id}
                title={articleTitle ? articleTitle : '제목이 없습니다.'}
                nickname={author.fullName ? `@${author.fullName}` : ''}
                postedDate={createdAt}
                hasImage={image !== undefined}
                likes={likes?.length || 0}
                comments={comments?.length || 0}
              />
            );
          } else {
            const { _id, fullName, image } = searchRes as User;
            return <UserItem key={_id} fullName={fullName} id={_id} image={image ? image : ''} />;
          }
        })}
      </div>
    </div>
  );
};

export default SearchResult;
