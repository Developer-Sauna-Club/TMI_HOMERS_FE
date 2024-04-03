import Loader from '@/components/Loader';
import SearchSkeleton from '@/components/SearchSkeleton';
import useAuthQuery from '@/hooks/useAuthQuery';
import InfiniteScroll from '@/pages/ArticlesPage/InfiniteScroll.tsx';
import FilteredData from '@/shared/components/FilteredData';
import FailedMessage from '../FailedMessage.tsx';
import useFetchArticles from '../useFetchArticles';

type RenderArticlesProps = {
  type: 'newest' | 'subscribed';
};

const RenderArticles = ({ type }: RenderArticlesProps) => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();

  const followingUsersIds = Array.from(new Set(user?.following.map((user) => user.user)));

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useFetchArticles({
    type,
    followingUsersIds,
  });

  if (isLoading) {
    return <SearchSkeleton SkeletonType="title" />;
  }

  if (type === 'subscribed') {
    if (!user) {
      return (
        <FailedMessage path="/login" label="로그인">
          로그인이 필요합니다. <br />
          로그인 페이지로 이동하시겠습니까?
        </FailedMessage>
      );
    } else if (!followingUsersIds.length) {
      <FailedMessage path="/search" label="구독하기">
        앗 구독한 글들이 없습니다. <br />
        다른 사용자를 팔로우하러 가시겠습니까?
      </FailedMessage>;
    }
  }

  return (
    <>
      <FilteredData type="article" data={data?.pages.flat()} />
      {isFetching ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <InfiniteScroll fetchData={fetchNextPage} canFetchMore={hasNextPage} />
      )}
    </>
  );
};

export default RenderArticles;
