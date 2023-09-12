import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkAuthentication } from '@/api/auth';
// import { axiosClient } from '@/api/axiosClient';
import Avatar from '@/components/Avatar';
import CloseButton from '@/components/CloseButton';
import SubButton from '@/components/SubButton';
import { User } from '@/type/User';

// TODO api 요청부 수정
// const NEW_ARTICLE_URL = '/posts/create';
// const createArticle = async () => {
//   const response = await axiosClient.post(NEW_ARTICLE_URL);
//   return response;
// };

const getUserData = async () => {
  const userData = await checkAuthentication();
  return userData;
};

// TODO input validation => React-hook-form 사용하기
// TODO auth 확인 후 api 보내기? auth 되었다고 가정하기? 양자택일

const NewArticlePage = () => {
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // NOTE 아이쒸 auth된 유저만 화면이 보이고, 아니면 LoginPage로 라우터 이동시켜주고 싶음.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await getUserData();
        setUserData(userDataResponse);
        setIsLoggedIn(true);
      } catch (error) {
        alert('유저 데이터 페칭 실패');
      }
    };

    if (!isLoggedIn) {
      fetchUserData(); // 사용자 데이터 가져오기
    }
  }, [isLoggedIn]);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-white">
      {isLoggedIn ? (
        <div className="flex flex-col w-[50%] h-auto gap-10">
          <div className="flex justify-between">
            <h1 className="font-bold font-Cafe24Surround text-tricorn-black text-[2rem] text-center">
              글 쓰기
            </h1>
            <Link to={`/home`}>
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
            <SubButton type="fill">작성하기</SubButton>
          </div>
          <div className="w-full">
            <input
              type="text"
              name=""
              id=""
              placeholder="제목을 입력해주세요"
              className="w-full bg-white border border-lazy-gray rounded-lg p-2 text-tricorn-black"
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="내용을 입력해주세요"
              className="w-full bg-white border border-lazy-gray rounded-lg mt-5 h-[300px] p-2 text-tricorn-black"
            />
          </div>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
};

export default NewArticlePage;
