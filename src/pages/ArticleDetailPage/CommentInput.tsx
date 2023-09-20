import { SubmitHandler, useForm } from 'react-hook-form';
import { RiQuillPenFill } from 'react-icons/ri';
import { CommentParams } from '@/api/common/Comment';
import Avatar from '@components/Avatar';

type CommentInputProps = {
  onAddComment: (comment: CommentParams) => void;
  postId: string;
};

type FormValueType = {
  comment: string;
};

const CommentInput = ({ onAddComment, postId }: CommentInputProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValueType>();

  const onSubmit: SubmitHandler<FormValueType> = (data) => {
    try {
      // alert(JSON.stringify(data));
      const newComment = {
        ...data,
        postId,
      };
      onAddComment(newComment);
      reset();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="fixed bottom-2 flex justify-center items-center max-w-[24.875rem] w-full max-h-[3.75rem] h-full rounded-2xl bg-[#EEF1F4] font-Cafe24SurroundAir">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between w-[23rem]">
          <div className="flex items-center justify-center">
            <Avatar width={1.5} profileImage="" isLoggedIn={false} />
          </div>
          <div className="flex items-center justify-center">
            <input
              {...register('comment', {
                required: '댓글을 작성해주세요',
                maxLength: {
                  value: 200,
                  message: '200자 이내로 입력해주세요',
                },
              })}
              className="w-[18rem] bg-[#EEF1F4] outline-none"
              placeholder="댓글을 작성해주세요."
              maxLength={200}
            />
          </div>
          <div className="flex items-center justify-center">
            <button className="outline-none cursor-pointer">
              <RiQuillPenFill className="fill-cooled-blue w-[1.5rem] h-[1.5rem]" />
            </button>
          </div>
        </div>
        {errors?.comment && (
          <span className="text-xs text-error-red">{errors.comment.message}</span>
        )}
      </form>
    </div>
  );
};

export default CommentInput;
