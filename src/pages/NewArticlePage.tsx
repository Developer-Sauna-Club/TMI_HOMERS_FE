import { ChangeEvent, FormEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AiOutlinePlus } from 'react-icons/ai';
import { axiosClient } from '@/api/axiosClient';
import Avatar from '@/components/Avatar';
import CloseButton from '@/components/CloseButton';
import HeaderText from '@/components/HeaderText';
import { DROPDOWN_OPTIONS, LENGTH_LIMIT, MESSAGE } from '@/constants/NewArticle';

const CHANNEL_ID = '64fac2e729260903240d2dab';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MDU0MzhmOWZhZTk1MmFhMGNmYjViOSIsImVtYWlsIjoiY3l0ZXN0QG5hdmVyLmNvbSJ9LCJpYXQiOjE2OTQ4NDM3OTF9.K0yj-8NtLbEeE9rzKz7Yutbvndc__n8rjLHF1pw_rh4';

type FormValue = {
  title: string;
  body: string;
  image: File;
};

const saveArticle = async ({ title, body, image }: FormValue) => {
  const formData = new FormData();
  formData.append('title', JSON.stringify({ title: title, body: body }));
  formData.append('channelId', CHANNEL_ID);
  formData.append('image', image);

  await axiosClient.post('/posts/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `bearer ${TOKEN}`,
    },
  });
};

const useArticle = () => {
  const queryClient = useQueryClient();

  return useMutation(saveArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(['search']);
    },
  });
};

const NewArticlePage = () => {
  const navigate = useNavigate();
  const [selectedText, setSelectedText] = useState('');
  const [titleCount, setTitleCount] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValue>();
  const addArticle = useArticle();
  const [image, setImage] = useState<File | null>(null);

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    try {
      addArticle.mutate({ ...data, image });
      alert(JSON.stringify(data));
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

  return (
    <div className="max-w-[25.875rem] mx-auto max-h-[56rem] h-full pt-[2.75rem] position:relative bg-cooled-blue font-Cafe24SurroundAir">
      <header className="flex flex-col">
        <div className="flex justify-between items-center mb-[1.75rem] ml-[2.44rem] mr-[1.56rem]">
          <HeaderText size="normal" label="글쓰기" />
          <CloseButton onClick={() => navigate(-1)} />
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col h-[48.5rem]  bg-white rounded-t-3xl">
          <div className="flex items-center justify-between mx-auto w-full max-w-[22.625rem] pt-[2rem]">
            <Avatar width={2.5} profileImage="" isLoggedIn={false} />
            <div className="flex w-[12.5rem]">
              <span className="font-Cafe24Surround">닉네임</span>
            </div>
            <button className="w-[6rem] h-[2.2rem] rounded-lg bg-cooled-blue font-Cafe24Surround text-white cursor-pointer">
              작성하기
            </button>
          </div>
          <div className="max-w-[22.625rem] mx-auto w-full">
            <div className="flex items-end h-[3.5rem] border-b-2 border-cooled-blue">
              <select onChange={handleTitleSelect} className="pb-2 mr-2 outline-none text-xs">
                {DROPDOWN_OPTIONS.map((option, index) => (
                  <option key={index} value={option}>
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
                    setSelectedText(e.target.value);
                  },
                })}
                value={selectedText}
                placeholder={MESSAGE.TITLE_REQUIRED}
                maxLength={LENGTH_LIMIT.TITLE_MAX}
                className="block w-full pb-2 outline-none"
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
                <img
                  className="block w-[3rem] pb-2"
                  src={URL.createObjectURL(image)}
                  alt="thumbnail"
                />
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
                className="overflow-hidden outline-none resize-none h-[20rem] w-full"
              />
              {errors?.body && (
                <span className="text-xs text-error-red mr-3">{errors.body.message}</span>
              )}
            </div>
          </div>
          <div className="max-w-[25.875rem] w-full h-[2rem] fixed bottom-4">
            <label
              htmlFor="file_input"
              className="flex items-center justify-center w-[2rem] h-[2rem] rounded-full bg-cooled-blue text-white font-Cafe24SurroundAir absolute right-4 bottom-4 shadow-md"
            >
              <AiOutlinePlus size="1.5rem" />
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
