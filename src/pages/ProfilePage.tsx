import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/api/axiosClient';
import getUserInfo from '@/api/getUserInfo';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { useAuthContext } from '@/hooks/useAuthContext';
import useScrollToTop from '@/hooks/useScrollToTop';
import { User } from '@/type/User';
import Avatar from '@components/Avatar';
import BackButton from '@components/BackButton';
import BottomNavigation from '@components/BottomNavigation';
import SubscribeInfo from '@components/SubscribeInfo';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { TabContextProvider } from '@context/TabContext';
import LikeArticles from './ProfilePage/LikeArticles';
import UserArticles from './ProfilePage/UserArticles';

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { ref, showScrollToTopButton, scrollToTop } = useScrollToTop();

  const pathSegments = location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];

  const [areYouProfileUser, setAreYouProfileUser] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const {
    data: externalUser,
    isError,
    isLoading,
  } = useQuery(['userInfo', lastSegment], () => getUserInfo(lastSegment), {
    enabled: !areYouProfileUser,
  });

  useEffect(() => {
    if (user) {
      setAreYouProfileUser(user._id === lastSegment);
      setActiveUser(areYouProfileUser ? user : externalUser);
    }
  }, [user, lastSegment, areYouProfileUser, externalUser]);

  useEffect(() => {
    if (isError) {
      navigate('/404');
    }
  }, [isError, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col justify-center h-screen max-w-[25.875rem] mx-auto pt-[3.75rem] font-Cafe24SurroundAir">
      <TabContextProvider>
        <header>
          <div className="flex justify-between flex-start px-[1.87rem]">
            <BackButton
              onClick={() => {
                navigate(-1);
              }}
            />
            <div
              onClick={() => {
                axiosClient.post('/logout');
              }}
              className="cursor-pointer h-[1.5rem] p-[1rem] flex items-center justify-center border-[0.05rem] rounded-lg text-[0.875rem]"
            >
              로그아웃
            </div>
          </div>
          <div className="flex justify-center pb-8 mb-[1.2rem] border-b-[0.01rem] border-tertiory-gray">
            <div className="flex flex-col items-center">
              <div>
                <Avatar width={8} profileImage="" isLoggedIn={areYouProfileUser} />
              </div>
              <div className="flex items-center mt-2 mb-[0.3rem]">
                <span className="text-center max-w-[7.3125rem] h-[1.8125rem] font-Cafe24Surround text-[1.375rem] -tracking-[0.01875rem] mr-2">
                  {activeUser?.fullName}
                </span>
                <span className="text-center max-w-[1.6875rem] h-[1.125rem] text-[0.875rem] text-lazy-gray">
                  기자
                </span>
              </div>
              <SubscribeInfo
                subscriber={activeUser ? activeUser.followers.length : 0}
                subscribing={activeUser ? activeUser.comments.length : 0}
              />
              <span className="text-center px-[2.8rem] mt-[1rem]">
                {activeUser ? activeUser.username : '자기소개가 없습니다.'}
              </span>
            </div>
          </div>
          <Tab
            maxWidth="25.875"
            tabItems={[
              { title: '작성한 기사', width: '12.9375' },
              { title: '응원한 기사', width: '12.9375' },
            ]}
          />
        </header>
        <article ref={ref} className="overflow-y-auto flex-grow">
          <TabItem title="작성한 기사" index="item1">
            {activeUser && activeUser.posts.length > 0 ? (
              <UserArticles userId={activeUser._id} />
            ) : (
              <div className="flex justify-center">
                <span className="text-center text-lazy-gray">작성한 기사가 없습니다.</span>
              </div>
            )}
          </TabItem>
          <TabItem title="응원한 기사" index="item2">
            {activeUser && activeUser.likes.length > 0 ? (
              activeUser.likes.map((likeArticle) => (
                <LikeArticles key={likeArticle.post} likeArticle={likeArticle} />
              ))
            ) : (
              <div className="flex justify-center">
                <span className="text-center text-lazy-gray">응원한 기사가 없습니다.</span>
              </div>
            )}
          </TabItem>
        </article>
      </TabContextProvider>
      <div>
        <BottomNavigation currentPage={`/profile/${lastSegment}`} />
      </div>
      <ScrollToTopButton show={showScrollToTopButton} onClick={scrollToTop} />
    </section>
  );
};

export default ProfilePage;
