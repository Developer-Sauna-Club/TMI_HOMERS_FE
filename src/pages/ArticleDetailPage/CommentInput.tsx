import { SubmitHandler, useForm } from 'react-hook-form';
import { RiQuillPenFill } from 'react-icons/ri';
import { CommentParams } from '@/api/Comment';
import Avatar from '@components/Avatar';
import { LENGTH_LIMIT, MESSAGE } from '@constants/ArticleDetail';

type CommentInputProps = {
  onAddComment: (comment: CommentParams) => void;
  postId: string;
  userImage: string;
  userId: string;
};

type FormValueType = {
  comment: string;
};

const CommentInput = ({ onAddComment, postId, userId, userImage }: CommentInputProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormValueType>();

  const onSubmit: SubmitHandler<FormValueType> = (data) => {
    const newComment = {
      ...data,
      postId,
      userId,
    };
    onAddComment(newComment);
    reset();
  };

  return (
    <div className="fixed bottom-2 flex justify-center items-center max-w-[24.875rem] w-full max-h-[3.75rem] h-full rounded-2xl bg-[#EEF1F4] dark:bg-lazy-gray font-Cafe24SurroundAir text-tricorn-black dark:text-footer-icon">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between w-[23rem]">
          <div className="flex items-center justify-center">
            <Avatar width={1.5} profileImage={userImage} isLoggedIn={false} />
          </div>
          <div className="flex items-center justify-center">
            <input
              {...register('comment', {
                required: MESSAGE.COMMENT_REQUIRED,
                maxLength: {
                  value: LENGTH_LIMIT.COMMENT_MAX,
                  message: MESSAGE.COMMENT_MAXLENGTH,
                },
              })}
              className="w-[18rem] bg-[#EEF1F4] dark:bg-lazy-gray dark:placeholder:text-wall-street outline-none"
              placeholder={MESSAGE.COMMENT_PLACEHOLDER}
              maxLength={LENGTH_LIMIT.COMMENT_MAX}
            />
          </div>
          <div className="flex items-center justify-center">
            <button className="outline-none cursor-pointer" disabled={isSubmitting}>
              <RiQuillPenFill className="fill-cooled-blue w-[1.5rem] h-[1.5rem]" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
