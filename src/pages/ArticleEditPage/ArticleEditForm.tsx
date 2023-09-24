import { useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { BiImageAdd } from 'react-icons/bi';
import { User } from '@/type/User';
import safeJSONParse from '@/utils/safeJSONParse';
import { CHANNEL_ID } from '@api/saveArticle';
import Avatar from '@components/Avatar';
import MainButton from '@components/MainButton';
import { DROPDOWN_OPTIONS, LENGTH_LIMIT, MESSAGE } from '@constants/NewArticle';
import { useEditPost } from '@hooks/useEdit';
import { FormValueType } from '../NewArticlePage';

const ArticleEditForm = ({
  articleInfo,
  articleImage,
  user,
  postId,
}: {
  articleInfo: string;
  articleImage: string;
  user: User | null | undefined;
  postId: string;
}) => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    setFocus,
    control,
    formState: { errors },
  } = useForm<FormValueType>({
    defaultValues: {
      title: '',
      body: '',
      image: null,
    },
    mode: 'onChange',
  });
  const { editPost, isLoading } = useEditPost();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const userPreviewImage = watch('image');

  const { title, body } = safeJSONParse(articleInfo);
  const [articleTitle, articleBody] = [watch('title'), watch('body')];

  const handleResizeTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const onSubmit: SubmitHandler<FormValueType> = async ({ title, body, image }) => {
    const stringifiedTitle = JSON.stringify({ title, body });
    editPost({ postId, title: stringifiedTitle, image, channelId: CHANNEL_ID });
  };

  useEffect(() => {
    if (textareaRef.current) {
      handleResizeTextareaHeight();
    }
  }, [articleBody]);

  useEffect(() => {
    if (userPreviewImage && userPreviewImage instanceof File) {
      setPreviewImage(userPreviewImage);
    }
  }, [userPreviewImage, setPreviewImage]);

  useEffect(() => {
    setValue('title', title ? title : '');
    setValue('body', body ? body : '');
    setFocus('body');
  }, [setValue, setFocus, title, body, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col h-[48.5rem]  bg-white dark:bg-tricorn-black rounded-t-3xl">
        <div className="flex items-center justify-between mx-auto w-full max-w-[22.625rem] pt-[2rem]">
          <Avatar width={2.5} profileImage={user ? user.image : ''} isLoggedIn={false} />
          <div className="flex w-[12.5rem]">
            <span className="font-Cafe24Surround">{user && user.fullName}</span>
          </div>
          <MainButton
            className="w-[6rem] h-[2.2rem] rounded-lg bg-cooled-blue font-Cafe24Surround text-white cursor-pointer"
            type="submit"
            label="수정하기"
            isLoading={isLoading}
          />
        </div>
        <div className="max-w-[22.625rem] mx-auto w-full">
          <div className="flex items-end h-[3.5rem] border-b-2 border-cooled-blue">
            <select className="flex items-center justify-center pb-2 mr-2 text-base outline-none dark:text-extra-white dark:bg-tricorn-black">
              {DROPDOWN_OPTIONS.map((option, index) => (
                <option key={index} value={option} className="text-center align-middle">
                  {option}
                </option>
              ))}
            </select>
            <input
              {...register('title', {
                required: MESSAGE.TITLE_REQUIRED,
                minLength: {
                  value: LENGTH_LIMIT.TITLE_MIN,
                  message: MESSAGE.TITLE_MINLENGTH,
                },
                maxLength: {
                  value: LENGTH_LIMIT.TITLE_MAX,
                  message: MESSAGE.TITLE_MAXLENGTH,
                },
              })}
              aria-required
              className="block w-full pb-2 bg-white outline-none dark:bg-tricorn-black"
            />
          </div>
          <div className="flex justify-end w-full">
            {errors?.title && (
              <span className="mr-3 text-xs text-error-red">{errors.title.message}</span>
            )}
            <span
              className={`text-xs ${
                articleTitle.length > LENGTH_LIMIT.TITLE_MAX ? 'text-error-red' : 'text-lazy-gray'
              }`}
            >{`${articleTitle.length}/${LENGTH_LIMIT.TITLE_MAX}`}</span>
          </div>
          <div className="block">
            {previewImage ? (
              <img
                className="block w-[3rem] pb-2"
                src={userPreviewImage ? URL.createObjectURL(previewImage) : ''}
                alt="thumbnail"
              />
            ) : (
              articleImage && (
                <img className="block w-[3rem] pb-2" src={articleImage} alt="thumbnail" />
              )
            )}
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  ref={(e) => {
                    textareaRef.current = e;
                    field.ref(e);
                  }}
                  placeholder={MESSAGE.CONTENT_REQUIRED}
                  className="w-full h-auto bg-white outline-none resize-none dark:bg-tricorn-black"
                  onChange={(e) => {
                    handleResizeTextareaHeight();
                    field.onChange(e);
                  }}
                />
              )}
              rules={{
                required: MESSAGE.CONTENT_REQUIRED,
                minLength: {
                  value: LENGTH_LIMIT.CONTENT_MIN,
                  message: MESSAGE.CONTENT_MINLENGTH,
                },
                maxLength: {
                  value: LENGTH_LIMIT.CONTENT_MAX,
                  message: MESSAGE.CONTENT_MAXLENGTH,
                },
              }}
            />

            {errors?.title && (
              <span className="mr-3 text-xs text-error-red">{errors.title.message}</span>
            )}
            <span
              className={`text-xs ${
                articleBody.length > LENGTH_LIMIT.CONTENT_MAX ? 'text-error-red' : 'text-lazy-gray'
              }`}
            >{`${articleBody.length}/${LENGTH_LIMIT.CONTENT_MAX}`}</span>
          </div>
        </div>
        <div className="max-w-[25.875rem] w-full h-[2rem] fixed bottom-4">
          <label
            htmlFor="file_input"
            className="flex items-center justify-center w-[2rem] h-[2rem] rounded-full bg-cooled-blue text-white font-Cafe24SurroundAir absolute right-4 bottom-4 shadow-md cursor-pointer"
          >
            <BiImageAdd size="1.2rem" />
          </label>
          <input
            id="file_input"
            type="file"
            accept="image/*"
            {...register('image')}
            onChange={(e) => {
              setValue('image', e.target.files && e.target.files[0], { shouldValidate: true });
            }}
            className="hidden"
          />
        </div>
      </div>
    </form>
  );
};

export default ArticleEditForm;
