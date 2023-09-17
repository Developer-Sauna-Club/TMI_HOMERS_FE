import { useNavigate } from 'react-router-dom';
import MainButton from '@/components/MainButton';

const LOGO_SRC = '/img/logo.svg';
const CHARACTER_SRC = '/img/character.png';
const START_BUTTON_CONTENT = '시작하기';

const LandingPage = () => {
  const navigate = useNavigate();
  const handleClickStartButton = () => {
    navigate('/home');
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col justify-center items-center gap-3">
        <img src={LOGO_SRC} className="w-[48%] max-w-[300px]" alt="logo" />
        <img src={CHARACTER_SRC} className="w-[44%] max-w-[500px]" alt="character" />
        <p className="font-Cafe24SurroundAir text-[1.25rem] text-wall-street text-center tracking-tighter">
          쓸데없는 것 쓰고 싶을 때
          <br />
          쓰고 싶은 곳 호머스
        </p>
      </div>
      <div className="mt-[5rem]">
        <MainButton label={START_BUTTON_CONTENT} onClick={handleClickStartButton} />
      </div>
    </div>
  );
};

export default LandingPage;
