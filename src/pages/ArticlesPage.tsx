import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { BsFire } from 'react-icons/bs';
import { MdOutlineSearch, MdStars } from 'react-icons/md';
import { fetchUserPosts } from '@/api/common/Post';
import BottomNavigation from '@/components/BottomNavigation';
import { API, ARTICLE_FETCH_LIMIT } from '@/constants/Article';
import useAuthQuery from '@/hooks/useAuthQuery';
import useScrollToTop from '@/hooks/useScrollToTop';
import { Follow } from '@/type/Follow';
import { getItemFromStorage, setItemToStorage } from '@/utils/localStorage';
import HeaderText from '@components/HeaderText';
import Loader from '@components/Loader';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { TAB_CONSTANTS } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';
import { useArticles } from '@hooks/useArticles';
import { useFilteredArticles } from '@hooks/useFilteredArticles';
import Articles from './ArticlesPage/Articles';
import InfiniteScroll from './ArticlesPage/InfiniteScroll';

const LOCAL_STORAGE_CURRENT_TAB_KEY = 'CURRENT_TAB';

const ArticlesPage = () => {
  const { data: articles, isFetching } = useArticles({
    id: API.CHANNEL_ID,
    type: 'channel',
  });
  const newestArticles = useFilteredArticles(TAB_CONSTANTS.NEWEST, articles);
  const hottestArticles = useFilteredArticles(TAB_CONSTANTS.HOTTEST, articles);
  const [followingUsers, setFollowingUsers] = useState<Follow[]>([]);
  const [currentTab, setCurrentTab] = useState(
    getItemFromStorage(LOCAL_STORAGE_CURRENT_TAB_KEY) || 'item1',
  );

  const {
    userQuery: { data: user },
  } = useAuthQuery();
  const navigate = useNavigate();

  const { ref: scrollRef, showScrollToTopButton, scrollToTop } = useScrollToTop();

  const changeTab = (newTab: string) => {
    setCurrentTab(newTab);
    setItemToStorage(LOCAL_STORAGE_CURRENT_TAB_KEY, newTab);
  };

  const fetchFollowingArticles = useCallback(
    async ({ pageParam = 0 }) => {
      const newArticles = await Promise.all(
        followingUsers.map((user) =>
          fetchUserPosts({ offset: pageParam, limit: ARTICLE_FETCH_LIMIT, authorId: user.user }),
        ),
      );
      return newArticles.flat();
    },
    [followingUsers],
  );

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['followingArticles', followingUsers],
    fetchFollowingArticles,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < ARTICLE_FETCH_LIMIT) {
          return undefined;
        }
        return pages.length * ARTICLE_FETCH_LIMIT;
      },
      enabled: followingUsers.length > 0,
    },
  );

  useEffect(() => {
    const savedTab = getItemFromStorage(LOCAL_STORAGE_CURRENT_TAB_KEY);
    if (savedTab) {
      setCurrentTab(savedTab);
    }
  }, [currentTab]);

  useEffect(() => {
    if (user) {
      setFollowingUsers(user.following);
    }
  }, [user, followingUsers]);

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
            active={currentTab}
            maxWidth="25.875"
            tabItems={[
              {
                title: `${TAB_CONSTANTS.NEWEST}`,
                width: '8.625',
                onClick: () => changeTab('item1'),
              },
              {
                title: `${TAB_CONSTANTS.HOTTEST}`,
                icon: <BsFire className="w-[1.3rem] h-[1.3rem]" />,
                width: '8.625',
                onClick: () => changeTab('item2'),
              },
              {
                title: `${TAB_CONSTANTS.SUBSCRIBED}`,
                icon: <MdStars className="w-[1.5rem] h-[1.5rem]" />,
                width: '8.625',
                onClick: () => changeTab('item3'),
              },
            ]}
          />
        </header>
        <article ref={scrollRef} className="flex-grow gap-4 overflow-y-auto">
          <TabItem index="item1">
            {isFetching ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              <Articles articles={newestArticles} />
            )}
          </TabItem>
          <TabItem index="item2">
            {isFetching ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              <Articles articles={hottestArticles} />
            )}
          </TabItem>
          <TabItem index="item3">
            {isFetching ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              <Articles articles={data?.pages.flat() || []} />
            )}
            <InfiniteScroll fetchData={fetchNextPage} canFetchMore={hasNextPage} />
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
