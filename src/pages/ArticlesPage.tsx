import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { BsFire } from 'react-icons/bs';
import { MdOutlineSearch, MdStars } from 'react-icons/md';
import BottomNavigation from '@components/BottomNavigation';
import HeaderText from '@components/HeaderText';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import {
  CURRENT_NEWS_TAB_KEY,
  TAB_CONSTANTS,
  TOTAL_TAB_WIDTH,
  TRIPLE_TAB_WIDTH,
} from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';
import useScrollToTop from '@hooks/useScrollToTop';
import useTab from '@hooks/useTab';
import { getItemFromStorage, setItemToStorage } from '@utils/localStorage';
import RenderFollowingArticles from './ArticlesPage/RenderFollowingArticles';
import RenderHottestArticles from './ArticlesPage/RenderHottestArticles';
import RenderNewestArticles from './ArticlesPage/RenderNewestArticles';

const ArticlesPage = () => {
  const { currentTab, changeTab } = useTab(CURRENT_NEWS_TAB_KEY);
  const navigate = useNavigate();
  const { ref: scrollRef, showScrollToTopButton, scrollToTop } = useScrollToTop();

  useEffect(() => {
    const savedTab = getItemFromStorage(CURRENT_NEWS_TAB_KEY);
    savedTab ? changeTab(savedTab) : setItemToStorage(CURRENT_NEWS_TAB_KEY, TAB_CONSTANTS.NEWEST);
  }, [currentTab, changeTab]);

  return (
    <TabContextProvider>
      <section className="max-w-[25.875rem] mx-auto h-screen flex flex-col relative overflow-hidden">
        <header className="flex flex-col pt-[2.75rem]">
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
            active={currentTab}
            maxWidth={TOTAL_TAB_WIDTH}
            defaultTab={`${TAB_CONSTANTS.NEWEST}`}
            tabItems={[
              {
                title: `${TAB_CONSTANTS.NEWEST}`,
                width: TRIPLE_TAB_WIDTH,
                onClick: () => changeTab(TAB_CONSTANTS.NEWEST),
              },
              {
                title: `${TAB_CONSTANTS.HOTTEST}`,
                icon: <BsFire className="w-[1.3rem] h-[1.3rem]" />,
                width: TRIPLE_TAB_WIDTH,
                onClick: () => changeTab(TAB_CONSTANTS.HOTTEST),
              },
              {
                title: `${TAB_CONSTANTS.SUBSCRIBED}`,
                icon: <MdStars className="w-[1.5rem] h-[1.5rem]" />,
                width: TRIPLE_TAB_WIDTH,
                onClick: () => changeTab(TAB_CONSTANTS.SUBSCRIBED),
              },
            ]}
          />
        </header>
        <article ref={scrollRef} className="flex-grow gap-4 overflow-y-auto">
          <TabItem index={`${TAB_CONSTANTS.NEWEST}`}>
            <RenderNewestArticles />
          </TabItem>
          <TabItem index={`${TAB_CONSTANTS.HOTTEST}`}>
            <RenderHottestArticles />
          </TabItem>
          <TabItem index={`${TAB_CONSTANTS.SUBSCRIBED}`}>
            <RenderFollowingArticles />
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
        <div className="flex justify-center flex-none w-full">
          <BottomNavigation currentPage="/news" />
        </div>
      </section>
    </TabContextProvider>
  );
};

export default ArticlesPage;
