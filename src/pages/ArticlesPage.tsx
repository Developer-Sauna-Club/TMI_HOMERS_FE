import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { BsFire } from 'react-icons/bs';
import { MdOutlineSearch, MdStars } from 'react-icons/md';
import { fetchUserPosts } from '@/api/common/Post';
import BottomNavigation from '@/components/BottomNavigation';
import { API } from '@/constants/Article';
import { useAuthContext } from '@/hooks/useAuthContext';
import useScrollToTop from '@/hooks/useScrollToTop';
import { Follow } from '@/type/Follow';
import { Post } from '@/type/Post';
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
  const hottestArticles = useFilteredArticles(TabConstants.HOTTEST, articles);
  const [offset, setOffset] = useState(0);
  const [canFetchMore, setCanFetchMore] = useState(true);
  const [followingUsers, setFollowingUsers] = useState<Follow[]>([]);
  const [followingArticles, setFollowingArticles] = useState<Post[]>([]);

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      setFollowingUsers(user.following);
    }
  }, [user, followingUsers]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500 &&
        canFetchMore
      ) {
        setOffset((prevOffset) => prevOffset + 10);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [canFetchMore]);

  useEffect(() => {
    if (followingUsers.length > 0 && canFetchMore) {
      followingUsers.forEach((article) => {
        fetchUserPosts({ offset, limit: 10, authorId: article.user }).then((userInfo) => {
          if (userInfo.length < 10) {
            setCanFetchMore(false);
          }
          userInfo.forEach((article) => {
            setFollowingArticles((prev) => [...prev, article]);
          });
        });
      });
    }
  }, [followingUsers, canFetchMore, offset]);

  const navigate = useNavigate();
  const { ref: articleTagRef, showScrollToTopButton, scrollToTop } = useScrollToTop();

  return (
    <TabContextProvider>
      <section className="max-w-[25.875rem] mx-auto h-screen flex flex-col relative">
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
            <Articles articles={hottestArticles} />
          </TabItem>
          <TabItem title={`${TabConstants.SUBSCRIBED}`} index="item3">
            <Articles articles={followingArticles} />
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
