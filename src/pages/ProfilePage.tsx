import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BiSolidUser } from 'react-icons/bi';
import { HiPencil } from 'react-icons/hi';
import { fetchUser } from '@/api/User';
import {
  BackButton,
  BottomNavigation,
  ScrollToTopButton,
  SubscribeInfo,
  Tab,
  TabItem,
} from '@/components';
import { useAuthQuery, useImageMutation, useScrollToTop, useTab, useToastContext } from '@/hooks';
import { getOptimizedImageURL } from '@/utils/imageURL';
import { CURRENT_PROFILE_TAB_KEY, TAB_CONSTANTS, TOTAL_TAB_WIDTH } from '@constants/Tab';
import { DOUBLE_TAB_WIDTH } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';

import { getItemFromStorage, setItemToStorage } from '@utils/localStorage';
import DropdownMenu from './ProfilePage/DropdownMenu';
import FollowButton from './ProfilePage/FollowButton';
import RenderLikedArticles from './ProfilePage/RenderLikedArticles';
import RenderUserArticles from './ProfilePage/RenderUserArticles';

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];
  const profileId = pathSegments[2];

  const {
    userQuery: { data: user },
    logoutQuery: { mutate: logoutMutate },
  } = useAuthQuery();
  const { data: userInfo, isLoading: userInfoLoading } = useQuery(['userInfo', lastSegment], () =>
    fetchUser(lastSegment),
  );

  const { showToast } = useToastContext();
  const { ref, showScrollToTopButton, scrollToTop } = useScrollToTop();
  const { currentTab, changeTab } = useTab(CURRENT_PROFILE_TAB_KEY);

  const isMyProfile = user ? user._id === userInfo?._id : false;
  const [userInfoPosts, setUserInfoPosts] = useState(userInfo?.posts || []);
  const [likeArticlesIds, setLikeArticlesIds] = useState(
    userInfo?.likes.map((like) => like.post) || [],
  );

  const userImageMutation = useImageMutation({
    queryKey: ['userInfo', lastSegment],
    showToast,
  });

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files;

    if (!imageFile || imageFile.length < 0) {
      return;
    }

    userImageMutation.mutate(imageFile[0]);
  };

  useEffect(() => {
    if (userInfo) {
      setUserInfoPosts(() => [...userInfo.posts]);
      setLikeArticlesIds(() => [...userInfo.likes.map((like) => like.post)]);
    }
  }, [userInfo]);

  useEffect(() => {
    const savedTab = getItemFromStorage(CURRENT_PROFILE_TAB_KEY);
    savedTab
      ? changeTab(savedTab)
      : setItemToStorage(CURRENT_PROFILE_TAB_KEY, TAB_CONSTANTS.WRITTEN_ARTICLES);
  }, [currentTab, changeTab]);

  return (
    <TabContextProvider>
      <section className="flex flex-col justify-center h-screen w-screen max-w-[25.875rem] mx-auto pt-[3.75rem] font-Cafe24SurroundAir relative overflow-hidden">
        <header>
          <div className="flex justify-between flex-start px-[1.87rem]">
            <BackButton
              onClick={() => {
                navigate(-1);
              }}
            />
            {isMyProfile && <DropdownMenu logoutMutate={logoutMutate} />}
            {!isMyProfile && <FollowButton user={user} profileId={profileId} />}
          </div>
          <div className="flex justify-center pb-8 mb-[1.2rem] border-b-[0.01rem] border-tertiory-gray relative">
            <div className="flex flex-col items-center">
              {
                <div className="relative self-center w-32 h-32 mb-6 border rounded-full bg-profile-bg border-tertiory-gray text-footer-icon">
                  {userInfoLoading ? (
                    <div className="w-full h-full bg-transparent rounded-full" />
                  ) : userInfo && userInfo.image ? (
                    <img
                      src={getOptimizedImageURL({ url: userInfo.image, width: 128, height: 128 })}
                      className="object-cover w-full h-full rounded-full"
                      alt="thumbnail"
                      width="128"
                      height="128"
                    />
                  ) : (
                    <BiSolidUser className="w-24 h-24 translate-x-4 translate-y-4" />
                  )}
                  {!userInfoLoading && isMyProfile && (
                    <>
                      <label
                        htmlFor="image"
                        className="absolute p-1 border rounded-full right-1 bottom-1 bg-profile-bg border-tertiory-gray"
                      >
                        <HiPencil className="w-4 h-4" />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image"
                        onChange={handleUploadImage}
                      />
                    </>
                  )}
                </div>
              }
              <div className="flex items-center mt-2 mb-[0.3rem]">
                <span className="text-center text-tricorn-black dark:text-white h-[1.8125rem] font-Cafe24Surround text-[1.375rem] -tracking-[0.01875rem] mr-2">
                  {userInfo?.fullName}
                </span>
                <span className="text-center text-wall-street max-w-[1.6875rem] h-[1.125rem] text-[0.875rem] dark:text-lazy-gray">
                  기자
                </span>
              </div>
              <SubscribeInfo
                subscriber={
                  userInfo
                    ? Array.from(new Set(userInfo.followers.map((follower) => follower._id))).length
                    : 0
                }
                subscribing={
                  userInfo
                    ? Array.from(new Set(userInfo.following.map((following) => following.user)))
                        .length
                    : 0
                }
              />
              <span className="text-center px-[2.8rem] mt-[1rem] text-wall-street dark:text-lazy-gray">
                {userInfo ? userInfo.username : '자기소개가 없습니다.'}
              </span>
            </div>
          </div>
          <Tab
            active={currentTab}
            maxWidth={TOTAL_TAB_WIDTH}
            defaultTab={`${TAB_CONSTANTS.WRITTEN_ARTICLES}`}
            tabItems={[
              {
                title: TAB_CONSTANTS.WRITTEN_ARTICLES,
                width: DOUBLE_TAB_WIDTH,
                onClick: () => changeTab(TAB_CONSTANTS.WRITTEN_ARTICLES),
              },
              {
                title: TAB_CONSTANTS.LIKED_ARTICLES,
                width: DOUBLE_TAB_WIDTH,
                onClick: () => changeTab(TAB_CONSTANTS.LIKED_ARTICLES),
              },
            ]}
          />
        </header>
        <article ref={ref} className="flex-grow overflow-y-auto">
          <TabItem index={`${TAB_CONSTANTS.WRITTEN_ARTICLES}`}>
            {userInfoPosts && userInfoPosts.length > 0 ? (
              <RenderUserArticles posts={userInfoPosts} />
            ) : (
              <div className="flex justify-center w-full h-full">
                <span className="flex items-center justify-center text-center text-lazy-gray">
                  {TAB_CONSTANTS.WRITTEN_ARTICLES}가 없습니다.
                </span>
              </div>
            )}
          </TabItem>
          <TabItem index={`${TAB_CONSTANTS.LIKED_ARTICLES}`}>
            {likeArticlesIds && likeArticlesIds.length > 0 ? (
              <RenderLikedArticles postIds={likeArticlesIds} />
            ) : (
              <div className="flex justify-center w-full h-full">
                <span className="flex items-center justify-center text-center text-lazy-gray">
                  {TAB_CONSTANTS.LIKED_ARTICLES}가 없습니다.
                </span>
              </div>
            )}
          </TabItem>
          <ScrollToTopButton show={showScrollToTopButton} onClick={scrollToTop} />
        </article>
        <div className="flex justify-center flex-none w-full">
          <BottomNavigation currentPage={'/profile'} />
        </div>
      </section>
    </TabContextProvider>
  );
};

export default ProfilePage;
