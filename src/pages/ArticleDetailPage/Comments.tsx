import { useEffect, useState } from 'react';
import { Comment as CommentType } from '@type/Comment';
import { useArticleDetail } from '@/hooks';
import Comment from '@components/Comment';

type CommentsProps = {
  comments: CommentType[];
  userId: string | null;
};

const Comments = ({ comments, userId }: CommentsProps) => {
  const [commentList, setCommentList] = useState<CommentType[]>(comments);
  const { deleteMyComment } = useArticleDetail();

  const handleDeleteComment = (commentId: string) => {
    deleteMyComment(commentId);
  };

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  return commentList?.map((comment_post) => {
    const { _id, comment, author, createdAt } = comment_post;
    const { fullName, _id: authorId, image: authorImage } = author;
    const isMyComment = userId === authorId;

    try {
      return (
        <Comment
          key={_id}
          commentId={_id}
          content={comment}
          postedDate={createdAt}
          nickname={fullName}
          active={isMyComment}
          authorId={authorId}
          profileImage={authorImage ? authorImage : ''}
          onDelete={handleDeleteComment}
        />
      );
    } catch (error) {
      alert(error);
    }
  });
};

export default Comments;
