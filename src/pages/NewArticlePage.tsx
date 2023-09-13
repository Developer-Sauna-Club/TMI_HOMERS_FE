import { SubmitHandler, useForm } from 'react-hook-form';
import { axiosClient } from '@/api/axiosClient';
import FormInput from '../components/FormInput';
// 디바운스 기능을 넣어야할까? 작성하기 버튼 누르면 되니까 필요없지않을까..?
//로컬스토리지에서 토큰 가져와서 데이터 넘겨줘야함

const TOKEN = 'Bearer';
const CHANNEL_ID = '';
const CREATE_POST = '/posts/create';

type ArticleInfo = {
  title: string;
  content: string;
};

const NewArticlePage = () => {
  const { handleSubmit } = useForm<ArticleInfo>();

  const onSubmit: SubmitHandler<ArticleInfo> = (data) => {
    const DATA = JSON.stringify(data);
    return axiosClient.post(
      CREATE_POST,
      {
        title: DATA,
        channelId: CHANNEL_ID,
      },
      {
        headers: {
          Authorization: TOKEN,
        },
      },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="title"
          placeholder="제목을 입력해주세요"
          registerOptions={{
            required: '제목은 필수입니다.',
          }}
        />
        <FormInput
          name="content"
          placeholder="내용을 입력해주세요"
          registerOptions={{
            required: '내용은 필수입니다.',
          }}
        />
        <hr />
        <button className="border px-4 py-1">작성하기</button>
      </form>
    </>
  );
};

export default NewArticlePage;
