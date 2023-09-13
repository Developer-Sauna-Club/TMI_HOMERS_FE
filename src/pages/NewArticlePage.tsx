import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuthentication } from '@/api/auth';
import { axiosClient } from '@/api/axiosClient';
import Avatar from '@/components/Avatar';
import CloseButton from '@/components/CloseButton';
import SubButton from '@/components/SubButton';
import { User } from '@/type/User';
import { getItemFromStorage } from '@/utils/localStorage';

type FormData = {
  postTitle: string;
  postBody: string;
};

const CHANNEL_ID = '64fac2e729260903240d2dab';
const NEW_ARTICLE_URL = '/posts/create';

const NewArticlePage = () => {
  const { handleSubmit, register } = useForm<FormData>();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await createArticle(data);
  };

  const getUserData = async () => {
    const userData = await checkAuthentication();
    if (userData) {
      return userData;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await getUserData();
        if (userDataResponse) {
          setUserData(userDataResponse);
          setIsLoggedIn(true);
        } else {
          // 토큰이 없으면 로그인 페이지로 리다이렉션
          setTimeout(() => {
            navigate('/login');
          }, 2500);
        }
      } catch (error) {
        alert('User data fetch failed.');
      }
    };

    if (!isLoggedIn) {
      fetchUserData(); // 사용자 데이터 가져오기
    }
  }, [isLoggedIn, navigate]);

  const TOKEN = JSON.parse(getItemFromStorage('token')!);

  // TODO api 요청부 수정
  const createArticle = async (form: FormData) => {
    const formData = new FormData();
    formData.append(
      'title',
      JSON.stringify({ postTitle: form.postTitle, postBody: form.postBody }),
    );
    formData.append('channelId', CHANNEL_ID);

    const response = await axiosClient.post(NEW_ARTICLE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response;
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-white">
      {isLoggedIn ? (
        <div className="flex flex-col w-[50%] h-auto gap-10">
          <div className="flex justify-between">
            <h1 className="font-bold font-Cafe24Surround text-tricorn-black text-[2rem] text-center">
              글 쓰기
            </h1>
            <Link to={`/news`}>
              <CloseButton />
            </Link>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-3">
              <Avatar width={2} profileImage={''} isLoggedIn={false} />
              <p className="font-Cafe24Surround text-[1rem]">
                {userData ? userData.fullName : '닉네임'}
              </p>
            </div>
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                {...register('postTitle', {
                  required: 'Required',
                })}
                placeholder="제목을 입력해주세요"
                className="w-full bg-white border border-lazy-gray rounded-lg p-2 text-tricorn-black"
              />
              <input
                type="text"
                {...register('postBody', {
                  required: 'Required',
                })}
                placeholder="내용을 입력해주세요"
                className="w-full bg-white border border-lazy-gray rounded-lg mt-5 h-[300px] p-2 text-tricorn-black"
              />
              <div className="text-right mt-5">
                <SubButton type="fill">작성하기</SubButton>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p>로그인이 필요합니다! 로그인 페이지로 이동합니다...</p>
      )}
    </div>
  );
};

export default NewArticlePage;
