import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@type/User';
import { BiImageAdd } from 'react-icons/bi';
import Avatar from '@components/Avatar';
import MainButton from '@components/MainButton';
import { API } from '@constants/Article';
import { DROPDOWN_OPTIONS, LENGTH_LIMIT, MESSAGE } from '@constants/NewArticle';
import { useEditPost } from '@hooks/useEdit';
import { useToastContext } from '@hooks/useToastContext';
import safeJSONParse from '@utils/safeJSONParse';
import { FormValueType } from '../NewArticlePage';
import ImagePreview from './ImagePreview';

const ArticleEditForm = ({
  articleInfo,
  articleImage,
  user,
  postId,
  imagePublicId,
}: {
  articleInfo: string;
  articleImage: string;
  user: User | null | undefined;
  postId: string;
  imagePublicId: string;
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
  const { showToast } = useToastContext();
  const [selectedText, setSelectedText] = useState(DROPDOWN_OPTIONS[0]);
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

  const handleTitleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.value;

    selectedText === DROPDOWN_OPTIONS[0] ? setSelectedText('') : setSelectedText(selectedText);
  };

  const onSubmit: SubmitHandler<FormValueType> = async ({ title, body, image }) => {
    if (selectedText === DROPDOWN_OPTIONS[0]) {
      showToast(MESSAGE.TITLE_PREFIX_REQUIRED, 'error');
      return;
    }

    const titleWithOption = `${selectedText} ${title}`;
    const stringifiedTitle = JSON.stringify({ title: titleWithOption, body });

    if (!userPreviewImage) {
      editPost({
        postId,
        title: stringifiedTitle,
        image,
        channelId: API.CHANNEL_ID,
        imageToDeletePublicId: imagePublicId,
      });
    } else {
      editPost({ postId, title: stringifiedTitle, image, channelId: API.CHANNEL_ID });
    }
  };

  const handleRemoveImage = () => {
    setValue('image', null);
  };

  useEffect(() => {
    if (articleImage) {
      setValue('image', articleImage);
    }
  }, [setValue, articleImage]);

  useEffect(() => {
    if (textareaRef.current) {
      handleResizeTextareaHeight();
    }
  }, [articleBody]);

  useEffect(() => {
    setValue('title', title ? title : '');
    setValue('body', body ? body : '');
    setFocus('body');
  }, [setValue, setFocus, title, body, user]);

  useEffect(() => {
    if (title) {
      const prefix = title.split(' ')[0];

      if (DROPDOWN_OPTIONS.includes(prefix)) {
        setSelectedText(prefix);
      }

      const remainingTitle = title.replace(prefix, '').trim();
      setValue('title', remainingTitle === '' ? prefix : remainingTitle);
    }
  }, [title, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col h-full bg-white dark:bg-tricorn-black rounded-t-3xl"
    >
      <div>
        <div className="flex items-center justify-between mx-auto w-full max-w-[22.625rem] pt-[2rem] mb-2">
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
          <div className="flex justify-center h-[2.8rem] border-b-2 pb-1 items-end border-cooled-blue gap-2">
            <select
              aria-required
              value={selectedText}
              onChange={handleTitleSelect}
              className="flex items-center justify-center text-base outline-none h-1/2 dark:text-extra-white dark:bg-tricorn-black"
            >
              {DROPDOWN_OPTIONS.map((option, index) => (
                <option
                  key={index}
                  value={option}
                  className="text-center"
                  disabled={option === DROPDOWN_OPTIONS[0]}
                >
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
                  message: MESSAGE.TITLE_MAX_LENGTH,
                },
              })}
              aria-required
              className="block w-full bg-white outline-none h-1/2 dark:bg-tricorn-black"
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
          <div className="block h-full">
            {userPreviewImage ? (
              <ImagePreview image={userPreviewImage} onRemove={handleRemoveImage} />
            ) : null}
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
                  message: MESSAGE.CONTENT_MAX_LENGTH,
                },
              }}
            />

            {errors?.body && (
              <span className="mr-3 text-xs text-error-red">{errors.body.message}</span>
            )}
            <span
              className={`text-xs ${
                articleBody.length > LENGTH_LIMIT.CONTENT_MAX ? 'text-error-red' : 'text-lazy-gray'
              }`}
            >{`${articleBody.length}/${LENGTH_LIMIT.CONTENT_MAX}`}</span>
          </div>
        </div>
        <div className="max-w-[25.875rem] w-full h-[2rem] bottom-4">
          <label
            htmlFor="file_input"
            className="flex items-center justify-center w-[3.5rem] h-[3.5rem] rounded-full bg-cooled-blue text-white font-Cafe24SurroundAir absolute right-4 bottom-4 shadow-md cursor-pointer"
          >
            <BiImageAdd size="1.7rem" />
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
