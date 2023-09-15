import { useNavigate } from 'react-router-dom';
import MainButton from '@/components/MainButton';

const LOGO_SRC = '/img/logo.svg';
const CHARACTER_SRC = '';
const START_BUTTON_CONTENT = '시작하기';

const LandingPage = () => {
  const navigate = useNavigate();
  const handleClickStartButton = () => {
    navigate('/home');
  };

  return (
    <div>
      <div>
        <img src={LOGO_SRC} alt="logo" />
        <img src={CHARACTER_SRC} alt="character" />
      </div>
      <div>
        <p>여러분만의 TMI 뉴스를 마음껏 공유해주세요</p>
      </div>
      <div>
        <MainButton label={START_BUTTON_CONTENT} onClick={handleClickStartButton} />
      </div>
    </div>
  );
};

export default LandingPage;
