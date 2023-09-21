import { useNavigate } from 'react-router-dom';
import MainButton from '@/components/MainButton';

const IMAGE_SRC = '/img/404.png';
const HOME_BUTTON_LABEL = '홈으로 이동하기';
const TEXT: { [key: string]: { CONTENT: string; CLASS: string } } = {
  TITLE: {
    CONTENT: '죄송합니다!',
    CLASS: 'font-Cafe24Surround text-[1.5rem] text-cooled-blue',
  },
  BODY: {
    CONTENT: '요청하신 페이지를 찾을 수 없어요.',
    CLASS: 'font-Cafe24SurroundAir text-[1rem] text-footer-icon font-bold dark:text-lazy-gray',
  },
};

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleClickHomeButton = () => {
    navigate('/home');
  };

  return (
    <div className="w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col justify-center items-center min-w-[200px]">
        <img src={IMAGE_SRC} className="w-[150px] max-w-[200px]" />
        <div className="text-center mt-3">
          <p className={TEXT.TITLE.CLASS}>{TEXT.TITLE.CONTENT}</p>
          <p className={TEXT.BODY.CLASS}>{TEXT.BODY.CONTENT}</p>
        </div>
      </div>
      <div className="">
        <MainButton label={HOME_BUTTON_LABEL} onClick={handleClickHomeButton} />
      </div>
    </div>
  );
};

export default NotFoundPage;
