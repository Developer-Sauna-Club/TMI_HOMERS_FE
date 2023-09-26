import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import SubButton from '@/components/SubButton';
import Loader from '@components/Loader';
import { API, ARTICLE_FETCH_LIMIT } from '@constants/Article';
import { TAB_CONSTANTS } from '@constants/Tab';
import useAuthQuery from '@hooks/useAuthQuery';
import { fetchArticles } from './fetchArticles';
import InfiniteScroll from './InfiniteScroll';
import RenderArticles from './RenderArticles';

const RenderFollowingArticles = () => {
  const {
    userQuery: { data: user, isLoading: userLoading },
  } = useAuthQuery();

  const navigate = useNavigate();
  const followingUsersIds = Array.from(new Set(user?.following.map((user) => user.user)));

  const fetchFollowing = useCallback(
    async ({ pageParam = 0 }) => {
      return fetchArticles({
        type: TAB_CONSTANTS.SUBSCRIBED,
        pageParam,
        followingUsersIds,
      });
    },
    [followingUsersIds],
  );

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['followingArticles', [...followingUsersIds]],
    fetchFollowing,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < ARTICLE_FETCH_LIMIT) {
          return undefined;
        }
        return pages.length * ARTICLE_FETCH_LIMIT;
      },
    },
  );

  return (
    <>
      {userLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {!data?.pages || data?.pages.flat().length === 0 ? (
            <div className="flex flex-col items-center justify-center w-2/3 h-full gap-4 mx-auto">
              <span className="block text-center font-Cafe24SurroundAir">
                앗, 팔로우한 사람들의 <br />글 목록이 존재하지 않습니다!
              </span>
              <div
                className="inline-block mx-auto"
                onClick={() => {
                  navigate(`${API.SEARCH_URL}`);
                }}
              >
                <SubButton size="small" color="blue" label="팔로우 하러 가기" type="outline" />
              </div>
            </div>
          ) : (
            <RenderArticles articles={data?.pages.flat() || []} />
          )}
          {isFetching && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
          <InfiniteScroll fetchData={fetchNextPage} canFetchMore={hasNextPage} />
        </>
      )}
    </>
  );
};

export default RenderFollowingArticles;
