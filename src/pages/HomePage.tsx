import { useNavigate } from 'react-router-dom';
import { HiFire } from 'react-icons/hi';
import { ImSearch } from 'react-icons/im';
import Loader from '@/components/Loader';
import { API } from '@/constants/Article';
import { MESSAGE, POST_COUNT } from '@/constants/Home';
import { CURRENT_NEWS_TAB_KEY, TAB_CONSTANTS } from '@/constants/Tab';
import { useArticles } from '@/hooks/useArticles';
import { useFilteredArticles } from '@/hooks/useFilteredArticles';
import BottomNavigation from '@components/BottomNavigation';
import HeaderText from '@components/HeaderText';
import useTab from '@hooks/useTab';
import RenderArticles from './ArticlesPage/RenderArticles';
import HotArticles from './HomePage/HotArticles';

const CHARACTER_SRC = '/img/character.png';

const HomePage = () => {
  const navigate = useNavigate();
  const { changeTab } = useTab(CURRENT_NEWS_TAB_KEY);

  const { data: articles, isLoading } = useArticles({
    id: API.CHANNEL_ID,
    type: 'channel',
  });

  const newestArticles = useFilteredArticles(TAB_CONSTANTS.NEWEST, articles).slice(
    0,
    POST_COUNT.NEWEST,
  );
  const hottestArticles = useFilteredArticles(TAB_CONSTANTS.HOTTEST, articles).slice(
    0,
    POST_COUNT.HOTTEST,
  );

  const handleClickSearchButton = () => {
    navigate('/search');
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col w-full max-w-md overflow-y-scroll gap-36">
        <section className="bg-cooled-blue dark:bg-dark-primary h-[375px] mb-10">
          <header className="flex h-[180px] justify-between px-10 items-center">
            <HeaderText label={MESSAGE.HOME} />
            <button onClick={handleClickSearchButton}>
              <ImSearch size="24" className="text-tricorn-black dark:text-white" />
            </button>
          </header>
          <section className="relative w-full h-[304px] gap-2 flex justify-center">
            <div className="w-10/12 max-w-[374px] flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <HiFire size="24" className="text-article-highly-liked" />
                <h2 className="flex-none text-lg font-bold text-tricorn-black dark:text-white font-Cafe24Surround">
                  <span
                    onClick={() => {
                      navigate('/news');
                      changeTab(TAB_CONSTANTS.HOTTEST);
                    }}
                    className="cursor-pointer"
                  >
                    {TAB_CONSTANTS.HOTTEST} 뉴스
                  </span>
                </h2>
              </div>
              <div className="bg-white dark:bg-tricorn-black text-tricorn-black dark:text-lazy-gray w-full rounded-xl shadow-article-container max-w-sm self-center h-[304px] z-20">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader />
                  </div>
                ) : (
                  <HotArticles articles={hottestArticles} />
                )}
              </div>
              <img
                src={CHARACTER_SRC}
                className="absolute w-[44%] max-w-[215px] -top-16 left-1/2 z-10"
                alt="character"
              />
            </div>
          </section>
        </section>
        <section className="flex flex-col justify-center flex-grow gap-6 pb-20">
          {/* <div className="bg-emerald-300 w-[280px] h-20 self-center" /> */}
          <div className="flex flex-col gap-3">
            <h2 className="px-10 text-lg font-bold text-tricorn-black dark:text-white font-Cafe24Surround">
              <span
                onClick={() => {
                  navigate('/news');
                  changeTab(TAB_CONSTANTS.NEWEST);
                }}
                className="cursor-pointer"
              >
                {TAB_CONSTANTS.NEWEST} 뉴스
              </span>
            </h2>
            <div className="">
              {isLoading ? (
                <div className="flex justify-center">
                  <Loader />
                </div>
              ) : (
                <RenderArticles articles={newestArticles} />
              )}
            </div>
          </div>
        </section>
      </div>
      <div className="fixed bottom-0 flex justify-center flex-none w-inherit">
        <BottomNavigation currentPage="/home" />
      </div>
    </div>
  );
};

export default HomePage;
