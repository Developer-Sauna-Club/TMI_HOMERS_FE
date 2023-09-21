import { useNavigate } from 'react-router-dom';
import { HiFire } from 'react-icons/hi';
import { ImSearch } from 'react-icons/im';
import Loader from '@/components/Loader';
import { API } from '@/constants/Article';
import { MESSAGE, POST_COUNT } from '@/constants/Home';
import { TAB_CONSTANTS } from '@/constants/Tab';
import { useArticles } from '@/hooks/useArticles';
import { useFilteredArticles } from '@/hooks/useFilteredArticles';
import BottomNavigation from '@components/BottomNavigation';
import HeaderText from '@components/HeaderText';
import Articles from './ArticlesPage/Articles';

const CHARACTER_SRC = '/img/character.png';

const HomePage = () => {
  const navigate = useNavigate();

  const { data: articles, isFetching } = useArticles({
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
    <div className="relative flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-md flex flex-col gap-36 overflow-y-scroll">
        <section className="bg-cooled-blue h-[375px] mb-10">
          <header className="flex h-[180px] justify-between px-10 items-center">
            <HeaderText label={MESSAGE.HOME} />
            <button onClick={handleClickSearchButton}>
              <ImSearch size="24" className="text-tricorn-black" />
            </button>
          </header>
          <section className="relative w-full h-[304px] gap-2 flex justify-center">
            <div className="w-10/12 max-w-[374px] flex flex-col gap-2">
              <div className="flex items-center">
                <HiFire size="24" className="text-article-highly-liked" />
                <h2 className="flex-none text-tricorn-black font-Cafe24Surround text-lg font-bold">
                  <span onClick={() => navigate('/news')} className="cursor-pointer">
                    {MESSAGE.HOTTEST_NEWS}
                  </span>
                </h2>
              </div>
              <div className="bg-white text-black w-full rounded-xl shadow-article-container max-w-sm self-center h-[304px] z-20">
                <div>
                  {isFetching ? (
                    <div className="flex justify-center">
                      <Loader />
                    </div>
                  ) : (
                    <Articles articles={hottestArticles} />
                  )}
                </div>
              </div>
              <img
                src={CHARACTER_SRC}
                className="absolute w-[44%] max-w-[215px] -top-16 left-1/2 z-10"
                alt="character"
              />
            </div>
          </section>
        </section>
        <section className=" bg-white flex flex-col justify-center gap-6 flex-grow pb-20">
          {/* <div className="bg-emerald-300 w-[280px] h-20 self-center" /> */}
          <div className="flex flex-col gap-3">
            <h2 className="text-tricorn-black font-Cafe24Surround text-lg font-bold px-7">
              <span onClick={() => navigate('/news')} className="cursor-pointer">
                {MESSAGE.NEWEST}
              </span>
            </h2>
            <div>
              {isFetching ? (
                <div className="flex justify-center">
                  <Loader />
                </div>
              ) : (
                <Articles articles={newestArticles} />
              )}
            </div>
          </div>
        </section>
      </div>
      <footer className="fixed bottom-0 flex-none justify-center items-center">
        <BottomNavigation currentPage="/home" />
      </footer>
    </div>
  );
};

export default HomePage;
