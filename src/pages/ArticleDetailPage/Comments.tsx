import { useState } from 'react';
import { Comment as CommentType } from '@type/Comment';
import { deleteComment } from '@/api/common/Comment';
import Comment from '@components/Comment';

type CommentsProps = {
  comments: CommentType[];
  userId: string | null;
};

const Comments = ({ comments, userId }: CommentsProps) => {
  const [commentList, setCommentList] = useState<CommentType[]>(comments);

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      const updatedComments = commentList.filter((comment) => comment._id !== commentId);
      setCommentList(updatedComments);
      //console.log(commentList);

      alert('댓글 삭제 완료');
    } catch (error) {
      alert(error);
    }
  };

  return comments?.map((comment_post) => {
    const { _id, comment, author, createdAt } = comment_post;
    const { fullName, _id: authorId } = author;
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
          onDelete={(commentId) => handleDeleteComment(commentId)}
        />
      );
    } catch (error) {
      alert(error);
    }
  });
};

export default Comments;
