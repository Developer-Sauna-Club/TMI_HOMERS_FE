import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { axiosClient } from '@api/axiosClient';
import FormInput from '@components/FormInput';

const CHANNEL_ID = '비밀';
const TEST_USER_TOKEN = '비밀';

type NewArticleType = {
  title: string;
  image: string;
  body: string;
};

const NewArticlePage = () => {
  const methods = useForm<NewArticleType>();

  const postArticle = async (data: NewArticleType) => {
    await axiosClient.post(
      '/posts/create',
      {
        title: JSON.stringify({ title: data.title, body: data.body }),
        channelId: CHANNEL_ID,
      },
      {
        headers: {
          Authorization: `bearer ${TEST_USER_TOKEN}`,
        },
      },
    );
  };

  const onSubmit: SubmitHandler<NewArticleType> = async (data) => {
    await postArticle(data);
    alert('제출완료');
  };

  return (
    <div className="m-1/2 flex flex-col items-center ">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            name="title"
            label="제목"
            registerOptions={{
              maxLength: {
                value: 20,
                message: '20자 이하로 작성하세요',
              },
            }}
            placeholder="제목을 작성하세요"
          />
          <FormInput name="image" label="사진" type="file" placeholder="사진 업로드" />
          <FormInput
            name="body"
            label="내용"
            registerOptions={{
              maxLength: {
                value: 500,
                message: '500자 이하로 작성하세요',
              },
            }}
            placeholder="내용을 작성하세요"
          />
          <button className="border-2">제출</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default NewArticlePage;
