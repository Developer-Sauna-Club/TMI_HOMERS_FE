import Article from '@/components/Article';
import useAuthQuery from '@/hooks/useAuthQuery';
import UserItem from '@/pages/Search/UserItem';
import { Post } from '@/type/Post';
import { User } from '@/type/User';

type FilteredData = {
  data: (Post | User)[] | undefined;
  type: 'article' | 'user';
};

const FilteredData = ({ data, type }: FilteredData) => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();
  
  const removeDuplicatedData = data?.filter(
    (article, index, self) => index === self.findIndex((a) => a._id === article._id),
  );

  return removeDuplicatedData?.map((dataValue) => {
    if (type === 'article') {
      const { _id, title, author, createdAt, likes, image, comments } = dataValue as Post;
      const myLike = likes.find((like) => (user ? like.user === user._id : false));
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
          myLikeArticle={!!myLike}
        />
      );
    } else {
      const { _id, fullName, image } = dataValue as User;
      return <UserItem key={_id} fullName={fullName} id={_id} image={image ? image : ''} />;
    }
  });
};

export default FilteredData;
