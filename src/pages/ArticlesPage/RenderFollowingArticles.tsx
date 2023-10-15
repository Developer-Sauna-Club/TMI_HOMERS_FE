import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loader from '@components/Loader';
import SearchSkeleton from '@components/SearchSkeleton';
import SubButton from '@components/SubButton';
import { FOLLOWING_ARTICLE_FETCH_LIMIT } from '@constants/Article';
import { TAB_CONSTANTS } from '@constants/Tab';
import useAuthQuery from '@hooks/useAuthQuery';
import { fetchArticles } from './fetchArticles';
import InfiniteScroll from './InfiniteScroll';
import RenderArticles from './RenderArticles';

const RenderFollowingArticles = () => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();

  const navigate = useNavigate();
  const followingUsersIds = Array.from(new Set(user?.following.map((user) => user.user)));

  const fetchFollowingArticles = useCallback(
    async ({ pageParam = 0 }) => {
      return fetchArticles({
        type: TAB_CONSTANTS.SUBSCRIBED,
        pageParam,
        followingUsersIds,
      });
    },
    [followingUsersIds],
  );

  const { data, fetchNextPage, hasNextPage, status, isFetching } = useInfiniteQuery(
    ['followingArticles'],
    fetchFollowingArticles,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < FOLLOWING_ARTICLE_FETCH_LIMIT) {
          return undefined;
        }
        return pages.length * FOLLOWING_ARTICLE_FETCH_LIMIT;
      },
      enabled: !!followingUsersIds.length,
    },
  );

  if (user === undefined) {
    return <SearchSkeleton SkeletonType="title" />;
  } else if (user === null) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-center font-Cafe24SurroundAir">
        <span className="mb-4">
          로그인이 필요합니다. <br />
          로그인 페이지로 이동하시겠습니까?
        </span>
        <SubButton
          label="로그인"
          color="blue"
          type="outline"
          onClick={() => {
            navigate('/login');
          }}
        />
      </div>
    );
  } else if (followingUsersIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-center font-Cafe24SurroundAir">
        <span className="mb-4">
          앗 구독한 글들이 없습니다. <br />
          다른 사용자를 팔로우하러 가시겠습니까?
        </span>
        <SubButton
          label="구독하기"
          color="blue"
          type="outline"
          onClick={() => {
            navigate('/search');
          }}
        />
      </div>
    );
  }

  return (
    <>
      {status === 'loading' && !data && <SearchSkeleton SkeletonType="title" />}
      <RenderArticles articles={data?.pages.flat() || []} />
      <InfiniteScroll fetchData={fetchNextPage} canFetchMore={hasNextPage} />
      {isFetching && status !== 'loading' && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default RenderFollowingArticles;
