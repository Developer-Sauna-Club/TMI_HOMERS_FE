import { useNavigate, Navigate } from 'react-router-dom';
import MainButton from '@/components/MainButton';
import { useAuthContext } from '@/hooks/useAuthContext';

const LOGO_SRC = '/img/logo.svg';
const CHARACTER_SRC = '/img/character.png';

const CATCHPHRASE = '쓸데없는 걸 쓰고 싶은데<br/>어디 쓸 데 없나?';
const START_BUTTON_CONTENT = '시작하기';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClickStartButton = () => {
    navigate('/home');
  };

  if (user === null) {
    return (
      <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col justify-center items-center gap-3">
          <img src={LOGO_SRC} className="w-[48%] max-w-[300px]" alt="logo" />
          <img src={CHARACTER_SRC} className="w-[44%] max-w-[500px]" alt="character" />
          <p className="font-Cafe24SurroundAir text-[1.25rem] text-wall-street text-center tracking-tighter">
            {CATCHPHRASE}
          </p>
        </div>
        <div className="mt-[5rem]">
          <MainButton label={START_BUTTON_CONTENT} onClick={handleClickStartButton} />
        </div>
      </div>
    );
  }

  return <Navigate to="/home" replace />;
};

export default LandingPage;
