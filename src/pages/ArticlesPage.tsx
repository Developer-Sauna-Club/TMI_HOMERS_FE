import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { BsFire } from 'react-icons/bs';
import { MdOutlineSearch, MdStars } from 'react-icons/md';
import BottomNavigation from '@/components/BottomNavigation';
import { API } from '@/constants/Article';
import useScrollToTop from '@/hooks/useScrollToTop';
import Article from '@components/Article';
import HeaderText from '@components/HeaderText';
import Loader from '@components/Loader';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { TabConstants } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';
import { useArticles } from '@hooks/useArticles';
import { useFilteredArticles } from '@hooks/useFilteredArticles';
import Articles from './ArticlesPage/Articles';

const ArticlesPage = () => {
  const { data: articles, isFetching } = useArticles({
    id: API.CHANNEL_ID,
    type: 'channel',
  });

  const newestArticles = useFilteredArticles(TabConstants.NEWEST, articles);
  // const hottestArticles = useFilteredArticles(TabConstants.HOTTEST, articles);
  // const subscribedArticles = useFilteredArticles(TabConstants.SUBSCRIBED, articles);

  const navigate = useNavigate();
  const { ref: articleTagRef, showScrollToTopButton, scrollToTop } = useScrollToTop();

  return (
    <TabContextProvider>
      <section className="max-w-[25.875rem] mx-auto h-screen flex flex-col relative dark:bg-[#1D232A]">
        <header className="flex flex-col bg-white pt-[2.75rem] dark:bg-[#1D232A]">
          <div className="flex justify-between mb-[1.75rem] ml-[2.44rem] mr-[1.56rem]">
            <HeaderText label="뉴스" />
            <MdOutlineSearch
              className="w-[1.8rem] h-[1.8rem] cursor-pointer"
              onClick={() => {
                navigate('/search');
              }}
            />
          </div>
          <Tab
            active="item1"
            maxWidth="25.875"
            tabItems={[
              { title: `${TabConstants.NEWEST}`, width: '8.625' },
              {
                title: `${TabConstants.HOTTEST}`,
                icon: <BsFire className="w-[1.3rem] h-[1.3rem]" />,
                width: '8.625',
              },
              {
                title: `${TabConstants.SUBSCRIBED}`,
                icon: <MdStars className="w-[1.5rem] h-[1.5rem]" />,
                width: '8.625',
              },
            ]}
          />
        </header>
        <article ref={articleTagRef} className="flex-grow gap-4 overflow-y-auto">
          <TabItem title={`${TabConstants.NEWEST}`} index="item1">
            {isFetching ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              <Articles articles={newestArticles} />
            )}
          </TabItem>
          <TabItem title={`${TabConstants.HOTTEST}`} index="item2">
            <Article
              id="1"
              title="(임시)이거슨 뜨겁다."
              nickname="@hot-guys"
              postedDate="2023-09-14T09:28:39.390Z"
              hasImage={false}
              likes={15}
              comments={42}
            />
          </TabItem>
          <TabItem title={`${TabConstants.SUBSCRIBED}`} index="item3">
            <Article
              id="1"
              title="(임시)이거슨 구독이다."
              nickname="@sub-scriber"
              postedDate="2023-09-14T09:28:39.390Z"
              hasImage={false}
              likes={12}
              comments={42}
            />
          </TabItem>
          <button
            onClick={scrollToTop}
            disabled={!showScrollToTopButton}
            className={`absolute p-2 flex items-center justify-center text-white w-[3.5rem] h-[3.5rem] bg-cooled-blue drop-shadow-[0_0.25rem_0.25rem_rgba(0,0,0,0.25)] transition-opacity duration-300 ease-in-out ${
              showScrollToTopButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } rounded-full bottom-24 right-4`}
          >
            <AiOutlineArrowUp className="w-[1.5rem] h-[1.5rem]" />
          </button>
        </article>
        <div>
          <BottomNavigation currentPage="/news" />
        </div>
      </section>
    </TabContextProvider>
  );
};

export default ArticlesPage;
