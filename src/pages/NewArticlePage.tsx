import { ChangeEvent, FormEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User } from '@type/User';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import Avatar from '@components/Avatar';
import CloseButton from '@components/CloseButton';
import HeaderText from '@components/HeaderText';
import MainButton from '@components/MainButton';
import { DROPDOWN_OPTIONS, ETC, LENGTH_LIMIT, MESSAGE } from '@constants/NewArticle';
import useAuthQuery from '@hooks/useAuthQuery';
import { useCreateArticle } from '@hooks/useCreateArticle';
import { useToastContext } from '@hooks/useToastContext';

export type FormValueType = {
  title: string;
  body: string;
  image: File | string | null;
};

const NewArticlePage = () => {
  const navigate = useNavigate();
  const {
    userQuery: { data: user },
  } = useAuthQuery();
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormValueType>({
    defaultValues: {
      title: '',
      body: '',
      image: null,
    },
    mode: 'onChange',
  });

  const [selectedText, setSelectedText] = useState(DROPDOWN_OPTIONS[0]);
  const [image, setImage] = useState<File | null>(null);

  const { showToast } = useToastContext();
  const { createPost, isLoading } = useCreateArticle();
  const [articleTitle, articleBody] = [watch('title'), watch('body')];

  const { fullName, image: profileImage } = user! as User;

  const onSubmit: SubmitHandler<FormValueType> = (data) => {
    if (selectedText === DROPDOWN_OPTIONS[0]) {
      showToast(MESSAGE.TITLE_PREFIX_REQUIRED, 'error');
      return;
    }

    const titleWithOption = `${selectedText} ${data.title}`;
    const newData = {
      ...data,
      title: titleWithOption,
    };
    createPost({ ...newData, image });
  };

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files;

    if (!imageFile || imageFile.length < 0) {
      return;
    }

    setImage(imageFile[0]);
  };

  const handleResizeTextareaHeight: FormEventHandler<HTMLTextAreaElement> = (event) => {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    trigger('body');
  };

  const handleTitleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.value;

    selectedText === DROPDOWN_OPTIONS[0] ? setSelectedText('') : setSelectedText(selectedText);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="max-w-[25.875rem] mx-auto h-screen w-screen relative bg-cooled-blue dark:bg-[#303E43] text-tricorn-black dark:text-extra-white font-Cafe24SurroundAir">
      <div className="h-[15%] pt-[2.75rem]">
        <header className="flex flex-col">
          <div className="flex justify-between items-center mb-[1.75rem] ml-[2.44rem] mr-[1.56rem]">
            <HeaderText size="normal" label={ETC.HEADER_WRITE} />
            <CloseButton onClick={() => navigate(-1)} />
          </div>
        </header>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="h-[85%]">
        <div className="flex flex-col bg-white dark:bg-tricorn-black h-full rounded-t-3xl">
          <div className="flex items-center justify-between px-[5%] w-full pt-[2rem] mb-2">
            <Avatar
              width={2.5}
              profileImage={profileImage ? profileImage : ''}
              isLoggedIn={false}
            />
            <div className="flex w-[12.5rem] ml-[2.5%]">
              <span className="font-Cafe24Surround">{fullName}</span>
            </div>
            <MainButton
              className="w-1/4 h-[2.2rem] rounded-lg bg-cooled-blue font-Cafe24Surround text-white cursor-pointer truncate"
              type="submit"
              label={ETC.BUTTON_WRITE}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
          <div className="max-w-[22.625rem] w-[90%] mx-auto">
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
                    className="text-center align-middle"
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
                placeholder={MESSAGE.TITLE_REQUIRED}
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
            <div className="block">
              {image && (
                <div className="relative inline-block pb-2">
                  <img
                    className="w-[5rem] rounded-lg cursor-pointer drop-shadow-md"
                    src={URL.createObjectURL(image)}
                    alt="thumbnail"
                    onClick={handleRemoveImage}
                  />
                  <AiOutlineCloseCircle
                    size="1rem"
                    className="absolute cursor-pointer text-lazy-gray top-1 right-1"
                    onClick={handleRemoveImage}
                  />
                </div>
              )}
              <textarea
                {...register('body', {
                  required: MESSAGE.CONTENT_REQUIRED,
                  onChange: handleResizeTextareaHeight,
                  minLength: {
                    value: LENGTH_LIMIT.CONTENT_MIN,
                    message: MESSAGE.CONTENT_MINLENGTH,
                  },
                  maxLength: {
                    value: LENGTH_LIMIT.CONTENT_MAX,
                    message: MESSAGE.CONTENT_MAX_LENGTH,
                  },
                })}
                placeholder={MESSAGE.CONTENT_REQUIRED}
                className="w-full h-auto overflow-hidden bg-white outline-none resize-none dark:bg-tricorn-black"
              />
              {errors?.body && (
                <span className="mr-3 text-xs text-error-red">{errors.body.message}</span>
              )}
              <span
                className={`text-xs ${
                  articleBody.length > LENGTH_LIMIT.CONTENT_MAX
                    ? 'text-error-red'
                    : 'text-lazy-gray'
                }`}
              >{`${articleBody.length}/${LENGTH_LIMIT.CONTENT_MAX}`}</span>
            </div>
          </div>
          <div className="max-w-[25.875rem] w-[90%] h-[2rem]">
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
              onChange={handleChangeImage}
              className="hidden"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewArticlePage;
