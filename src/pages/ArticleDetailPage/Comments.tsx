import Comment from '@/components/Comment';
import { Comment as CommentType } from '@/type/Comment';

type CommentsProps = {
  comments: CommentType[];
};

const Comments = ({ comments }: CommentsProps) => {
  return comments?.map((comment_post) => {
    const { _id, comment, author, createdAt } = comment_post;
    const { fullName } = author;

    try {
      return (
        <Comment
          key={_id}
          content={comment}
          postedDate={createdAt}
          nickname={fullName}
          active={false}
        />
      );
    } catch (error) {
      alert(error);
    }
  });
};

export default Comments;
