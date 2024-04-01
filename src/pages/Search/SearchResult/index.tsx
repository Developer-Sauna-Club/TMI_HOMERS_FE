import { Fragment } from 'react';
import Article from '@/components/Article';
import UserListItem from '@/pages/SearchPage/UserListItem';
import { Post } from '@/type/Post';
import { User } from '@/type/User';
import CountSearchResult from './CountSearchResult';
import NoResult from './NoResult';

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
    <>
      {filteredSearchResList?.map((searchRes, index) => {
        if (type === 'title') {
          const { _id, title, author, createdAt, likes, image, comments } = searchRes as Post;
          const { title: articleTitle } = title ? JSON.parse(title) : { title: '' };

          return (
            <div key={_id}>
              <CountSearchResult index={index} length={filteredSearchResList.length} />
              <Article
                id={_id}
                title={articleTitle ? articleTitle : '제목이 없습니다.'}
                nickname={author.fullName ? `@${author.fullName}` : ''}
                postedDate={createdAt}
                hasImage={image !== undefined}
                likes={likes?.length || 0}
                comments={comments?.length || 0}
              />
            </div>
          );
        } else {
          const { _id, fullName, image } = searchRes as User;
          return (
            <div key={_id}>
              <CountSearchResult index={index} length={filteredSearchResList.length} />
              <UserListItem fullName={fullName} id={_id} image={image ? image : ''} />
            </div>
          );
        }
      })}
    </>
  );
};

export default SearchResult;
