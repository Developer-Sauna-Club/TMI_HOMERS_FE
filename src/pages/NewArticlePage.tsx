import { FormEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { axiosClient } from '@/api/axiosClient';

type FormValue = {
  title: string;
  body: string;
  image: FileList;
};

const CHANNEL_ID = '';
const TOKEN = '';

const saveArticle = async ({ title, body, image }: FormValue) => {
  const formData = new FormData();
  formData.append('title', JSON.stringify({ title: title, body: body }));
  formData.append('channelId', CHANNEL_ID);
  formData.append('image', image[0]);

  axiosClient.post('/posts/create', formData, {
    headers: {
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
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValue>();
  const addArticle = useArticle();
  const [success, setSuccess] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files;
    if (!imageFile || imageFile.length < 0) {
      return;
    }
    setImage(imageFile[0]);
  };

  const textareaAutosize: FormEventHandler<HTMLTextAreaElement> = (event) => {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    trigger('body');
  };

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    alert(JSON.stringify(data));
    addArticle.mutate(data, {
      onSuccess: () => {
        setSuccess('성공적으로 게시글이 등록되었습니다');
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      },
    });
  };

  return (
    <div>
      <h2>글 작성 페이지입니다!</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {image && (
        <img className="w-96 mx-auto mb-2" src={URL.createObjectURL(image)} alt="thumbnail" />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justiy-center items-center gap-2"
      >
        <label>제목</label>
        <input
          {...register('title', {
            required: '제목을 작성해주세요',
            minLength: {
              value: 2,
              message: '2글자 이상으로 입력해주세요',
            },
            maxLength: {
              value: 10,
              message: '10글자 이내로 입력해주세요',
            },
            onChange: () => trigger('title'),
          })}
        />
        {errors?.title && <p className="text-red-300">{errors.title.message}</p>}
        <label>내용</label>
        <textarea
          {...register('body', {
            required: '기사를 작성해주세요',
            onChange: textareaAutosize,
            maxLength: {
              value: 500,
              message: '500자 이하로 입력해주세요',
            },
          })}
        />
        {errors?.body && <p className="text-red-300">{errors.body.message}</p>}
        <label>이미지</label>
        <input type="file" accept="image/*" {...register('image')} onChange={handleChangeImage} />
        <button>작성하기</button>
      </form>
    </div>
  );
};

export default NewArticlePage;
