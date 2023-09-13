import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Post } from '@type/Post';
import { axiosClient } from '@api/axiosClient';
import FormInput from '@components/FormInput';

type NewArticleForm = {
  title: string;
  image: string;
  body: string;
};

const NewArticlePage = () => {
  const CHANNEL_ID = '64fac2e729260903240d2dab';
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MDA3NDliOWZhZTk1MmFhMGNmYTJmOCIsImVtYWlsIjoiZG5yODg3NEBuYXZlci5jb20ifSwiaWF0IjoxNjk0NTY4NjAzfQ.cDVQjvcePndQnC8sN5O65e4B_NQjW2TElsujoqkcoOY';
  const methods = useForm<NewArticleForm>();
  const queryClient = useQueryClient();

  const saveArticle = async (data: NewArticleForm) => {
    const formData = new FormData();
    formData.append('title', JSON.stringify({ title: data.title, body: data.body }));
    formData.append('image', data.image[0]);
    formData.append('channelId', CHANNEL_ID);

    await axiosClient.post('/posts/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `bearer ${TOKEN}`,
      },
    });
  };

  const fetchArticles = async () => {
    const response = await axiosClient.get(`/posts/channel/${CHANNEL_ID}`);
    return response.data;
  };

  const onSubmit: SubmitHandler<NewArticleForm> = async (data) => {
    await saveArticle(data);
    queryClient.invalidateQueries(['articles']);
  };

  const { data: articles } = useQuery<Post[]>(['articles'], fetchArticles);

  const renderArticles = () => {
    return articles?.map((article) => {
      const { _id, title, author, updatedAt, likes, comments, image } = article;
      const { fullName } = author;
      try {
        const { title: articleTitle, body } = JSON.parse(title);
        return (
          <div key={_id} className="mx-auto">
            <h2 className="text-xl font-bold">{articleTitle}</h2>
            <p>{body}</p>
            <p>{fullName}</p>
            <p>{updatedAt}</p>
            <img className="w-96" src={image} alt="이미지" />
            <p>
              좋아요: {likes.length} 댓글: {comments.length}
            </p>
          </div>
        );
      } catch (error) {
        return (
          <div key={_id} className="mx-auto ">
            <h2 className="text-xl font-bold">
              이것은 말이지요 title이 이상하게 저장되어서 에러가 난 것입니다. 수정하세용
            </h2>
            <p>{fullName}</p>
            <p>{updatedAt}</p>
            <img src={image} alt="이미지" />
            <p>
              좋아요: {likes.length} 댓글: {comments.length}
            </p>
          </div>
        );
      }
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <h2>글 작성 페이지입니다!</h2>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            name="title"
            label="제목을 쓰자!!"
            registerOptions={{
              maxLength: {
                value: 20,
                message: '글자수가 너무 많습니다.',
              },
            }}
            placeholder="글 작성합시다."
          />
          <FormInput
            name="image"
            label="사진을 올리자"
            type="file"
            placeholder="사진을 올려봅시다."
          />
          <FormInput
            name="body"
            label="글을 쓰자"
            registerOptions={{ maxLength: 500 }}
            placeholder="글 작성합시다."
          />
          <button>작성</button>
        </form>
      </FormProvider>
      <div className="flex flex-col justify-center">{renderArticles()}</div>
    </>
  );
};

export default NewArticlePage;
