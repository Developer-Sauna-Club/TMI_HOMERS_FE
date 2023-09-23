import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Follow } from '@type/Follow';
import { User } from '@type/User';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { BsFire } from 'react-icons/bs';
import { MdOutlineSearch, MdStars } from 'react-icons/md';
import BottomNavigation from '@components/BottomNavigation';
import HeaderText from '@components/HeaderText';
import Loader from '@components/Loader';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { API, ARTICLE_FETCH_LIMIT } from '@constants/Article';
import { CURRENT_NEWS_TAB_KEY, TAB_CONSTANTS } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';
import { useArticles } from '@hooks/useArticles';
import useAuthQuery from '@hooks/useAuthQuery';
import { useFilteredArticles } from '@hooks/useFilteredArticles';
import useScrollToTop from '@hooks/useScrollToTop';
import useTab from '@hooks/useTab';
import { getItemFromStorage, setItemToStorage } from '@utils/localStorage';
import { fetchArticles } from './ArticlesPage/fetchArticles';
import InfiniteScroll from './ArticlesPage/InfiniteScroll';
import RenderArticles from './ArticlesPage/RenderArticles';

const ArticlesPage = () => {
  const { data: articles, isLoading } = useArticles({
    id: API.CHANNEL_ID,
    type: 'channel',
  });
  const hottestArticles = useFilteredArticles(TAB_CONSTANTS.HOTTEST, articles);
  const { currentTab, changeTab } = useTab(CURRENT_NEWS_TAB_KEY);
  const [followingUsers, setFollowingUsers] = useState<Follow[]>([]);

  const {
    userQuery: { data: user },
  } = useAuthQuery();

  const navigate = useNavigate();
  const { ref: scrollRef, showScrollToTopButton, scrollToTop } = useScrollToTop();

  const fetchNewest = useCallback(async ({ pageParam = 0 }) => {
    return fetchArticles({ type: TAB_CONSTANTS.NEWEST, pageParam });
  }, []);

  const fetchFollowing = useCallback(
    async ({ pageParam = 0 }) => {
      return fetchArticles({
        type: TAB_CONSTANTS.SUBSCRIBED,
        pageParam,
        followingUsers: (user as User).following,
      });
    },
    [user],
  );

  const {
    data: infiniteNewestArticles,
    fetchNextPage: fetchNextNewestPage,
    hasNextPage: hasNextNewestPage,
    isLoading: newestArticlesLoading,
    isFetching: newestArticlesFetching,
  } = useInfiniteQuery(['newestArticles'], fetchNewest, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < ARTICLE_FETCH_LIMIT) {
        return undefined;
      }
      return pages.length * ARTICLE_FETCH_LIMIT;
    },
  });

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['followingArticles', followingUsers],
    fetchFollowing,
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
    const savedTab = getItemFromStorage(CURRENT_NEWS_TAB_KEY);
    savedTab ? changeTab(savedTab) : setItemToStorage(CURRENT_NEWS_TAB_KEY, TAB_CONSTANTS.NEWEST);
  }, [currentTab, changeTab]);

  useEffect(() => {
    if (user) {
      setFollowingUsers(user.following);
    }
  }, [user, followingUsers]);

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
            maxWidth="25.875"
            defaultTab={`${TAB_CONSTANTS.NEWEST}`}
            tabItems={[
              {
                title: `${TAB_CONSTANTS.NEWEST}`,
                width: '8.625',
                onClick: () => changeTab(TAB_CONSTANTS.NEWEST),
              },
              {
                title: `${TAB_CONSTANTS.HOTTEST}`,
                icon: <BsFire className="w-[1.3rem] h-[1.3rem]" />,
                width: '8.625',
                onClick: () => changeTab(TAB_CONSTANTS.HOTTEST),
              },
              {
                title: `${TAB_CONSTANTS.SUBSCRIBED}`,
                icon: <MdStars className="w-[1.5rem] h-[1.5rem]" />,
                width: '8.625',
                onClick: () => changeTab(TAB_CONSTANTS.SUBSCRIBED),
              },
            ]}
          />
        </header>
        <article ref={scrollRef} className="flex-grow gap-4 overflow-y-auto">
          <TabItem index={`${TAB_CONSTANTS.NEWEST}`}>
            {newestArticlesLoading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              <>
                <RenderArticles articles={infiniteNewestArticles?.pages.flat() || []} />
                {newestArticlesFetching && (
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                )}
                <InfiniteScroll fetchData={fetchNextNewestPage} canFetchMore={hasNextNewestPage} />
              </>
            )}
          </TabItem>
          <TabItem index={`${TAB_CONSTANTS.HOTTEST}`}>
            {isLoading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              <RenderArticles articles={hottestArticles} />
            )}
          </TabItem>
          <TabItem index={`${TAB_CONSTANTS.SUBSCRIBED}`}>
            {isLoading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              <RenderArticles articles={data?.pages.flat() || []} />
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
        <div className="flex justify-center flex-none w-full">
          <BottomNavigation currentPage="/news" />
        </div>
      </section>
    </TabContextProvider>
  );
};

export default ArticlesPage;
