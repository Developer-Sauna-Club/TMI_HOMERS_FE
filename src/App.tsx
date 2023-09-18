import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

const TempNavBar = () => {
  const ANCHOR_CLASS = 'border-b border-gray-200 no-underline hover:text-cooled-blue';
  return (
    <header className="absolute w-[20px] h-[20px] top-[20%] z-50">
      <div className="bg-white border gap-1 flex flex-col mb-3 rounded-r-xl">
        <a className={ANCHOR_CLASS} href="/news">
          뉴스
        </a>
        <a className={ANCHOR_CLASS} href="/signUp">
          회원가입
        </a>
        <a className={ANCHOR_CLASS} href="/login">
          로그인
        </a>
        <a className={ANCHOR_CLASS} href="/search">
          검색
        </a>
        <a className={ANCHOR_CLASS} href="/profile">
          프로필
        </a>
        <a className={ANCHOR_CLASS} href="/news/create">
          글작성
        </a>
        <a className={ANCHOR_CLASS} href="/notification">
          알림
        </a>
        <a className={ANCHOR_CLASS} href="/profile/edit">
          프로필수정
        </a>
      </div>
    </header>
  );
};

const App = () => {
  return (
    <AuthContextProvider>
      <TempNavBar />
      <Outlet />
    </AuthContextProvider>
  );
};

export default App;
