import { ChangeEvent, FormEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import Avatar from '@/components/Avatar';
import CloseButton from '@/components/CloseButton';
import HeaderText from '@/components/HeaderText';
import Loader from '@/components/Loader';
import { DROPDOWN_OPTIONS, ETC, LENGTH_LIMIT, MESSAGE } from '@/constants/NewArticle';
import { useArticle } from '@/hooks/useArticle';
import useAuthQuery from '@/hooks/useAuthQuery';
import { User } from '@/type/User';

export type FormValueType = {
  title: string;
  body: string;
  image: File | null;
};

const NewArticlePage = () => {
  const navigate = useNavigate();
  const {
    userQuery: { data: user },
  } = useAuthQuery();
  const [selectedText, setSelectedText] = useState('');
  const [titleCount, setTitleCount] = useState(0);

  const { fullName, image: profileImage } = user! as User;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValueType>();
  const { createPost, isLoading } = useArticle();
  const [image, setImage] = useState<File | null>(null);

  const onSubmit: SubmitHandler<FormValueType> = (data) => {
    try {
      const titleWithOption = `${selectedText} ${data.title}`;
      const newData = {
        ...data,
        title: titleWithOption,
      };
      createPost({ ...newData, image });
    } catch (error) {
      alert(error);
    }
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

  const handleTitleCount = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleCount(event.target.value.length);
  };

  const handleTitleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.value;

    if (selectedText === '선택') {
      setSelectedText('');
      return;
    } else {
      setSelectedText(selectedText);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="max-w-[25.875rem] mx-auto h-screen pt-[2.75rem] position:relative bg-cooled-blue dark:bg-[#303E43] text-tricorn-black dark:text-extra-white font-Cafe24SurroundAir">
      <header className="flex flex-col">
        <div className="flex justify-between items-center mb-[1.75rem] ml-[2.44rem] mr-[1.56rem]">
          <HeaderText size="normal" label={ETC.HEADER_WRITE} />
          <CloseButton onClick={() => navigate(-1)} />
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col h-screen bg-white dark:bg-tricorn-black rounded-t-3xl">
          <div className="flex items-center justify-between mx-auto w-full max-w-[22.625rem] pt-[2rem]">
            <Avatar
              width={2.5}
              profileImage={profileImage ? profileImage : ''}
              isLoggedIn={false}
            />
            <div className="flex w-[12.5rem]">
              <span className="font-Cafe24Surround">{fullName}</span>
            </div>
            <button className="w-[6rem] h-[2.2rem] rounded-lg bg-cooled-blue font-Cafe24Surround text-white cursor-pointer">
              {isLoading ? <Loader /> : ETC.BUTTON_WRITE}
            </button>
          </div>
          <div className="max-w-[22.625rem] mx-auto w-full">
            <div className="flex justify-center items-end h-[3.5rem] border-b-2 border-cooled-blue">
              <select
                onChange={handleTitleSelect}
                className="flex justify-center items-center pb-2 mr-2 outline-none text-base dark:text-extra-white dark:bg-tricorn-black"
              >
                {DROPDOWN_OPTIONS.map((option, index) => (
                  <option key={index} value={option} className="align-middle text-center">
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
                  onChange: (e) => {
                    handleTitleCount(e);
                    trigger('title');
                  },
                })}
                placeholder={MESSAGE.TITLE_REQUIRED}
                maxLength={LENGTH_LIMIT.TITLE_MAX}
                className="block w-full pb-2 outline-none bg-white dark:bg-tricorn-black"
              />
            </div>
            <div className="flex justify-end w-full">
              {errors?.title && (
                <span className="text-xs text-error-red mr-3">{errors.title.message}</span>
              )}
              <span
                className={`text-xs ${
                  titleCount > LENGTH_LIMIT.TITLE_MAX ? 'text-error-red' : 'text-lazy-gray'
                }`}
              >{`${titleCount}/${LENGTH_LIMIT.TITLE_MAX}`}</span>
            </div>
            <div className="block">
              {image && (
                <div className="inline-block pb-2 relative">
                  <img
                    className="w-[5rem] rounded-lg cursor-pointer drop-shadow-md"
                    src={URL.createObjectURL(image)}
                    alt="thumbnail"
                    onClick={handleRemoveImage}
                  />
                  <AiOutlineCloseCircle
                    size="1rem"
                    className="text-lazy-gray absolute top-1 right-1 cursor-pointer"
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
                    message: MESSAGE.CONTENT_MAXLENGTH,
                  },
                })}
                placeholder={MESSAGE.CONTENT_REQUIRED}
                maxLength={LENGTH_LIMIT.CONTENT_MAX}
                className="overflow-hidden outline-none resize-none h-[20rem] w-full bg-white dark:bg-tricorn-black"
              />
              {errors?.body && (
                <span className="text-xs text-error-red mr-3">{errors.body.message}</span>
              )}
            </div>
          </div>
          <div className="max-w-[25.875rem] w-full h-[2rem] fixed bottom-4">
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
