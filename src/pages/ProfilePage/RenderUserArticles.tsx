import { useInfiniteQuery } from '@tanstack/react-query';
import { Post } from '@type/Post';
import Loader from '@components/Loader';
import SearchSkeleton from '@components/SearchSkeleton';
import { ARTICLE_FETCH_LIMIT } from '@constants/Article';
import InfiniteScroll from '../ArticlesPage/InfiniteScroll';
import RenderArticles from '../ArticlesPage/RenderArticles';

type UserArticlesProps = {
  posts: Post[];
};

const RenderUserArticles = ({ posts }: UserArticlesProps) => {
  const calculateIndices = (page: number, userArticlesLength: number) => {
    const startIdx = Math.min((page - 1) * ARTICLE_FETCH_LIMIT, userArticlesLength);
    const endIdx = Math.min(startIdx + ARTICLE_FETCH_LIMIT, userArticlesLength);
    return { startIdx, endIdx };
  };

  const fetchArticlesByPage = async ({ pageParam = 1 }) => {
    const { startIdx, endIdx } = calculateIndices(pageParam, posts.length);

    if (startIdx === endIdx) {
      return [];
    }

    const requests = posts.slice(startIdx, endIdx);
    return Promise.all(requests);
  };

  const {
    data: infiniteFetchUserArticles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(['userArticles'], fetchArticlesByPage, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },
  });

  return (
    <>
      {isLoading && <SearchSkeleton SkeletonType="title" />}
      {infiniteFetchUserArticles?.pages.flatMap((page) => page) && (
        <RenderArticles articles={infiniteFetchUserArticles?.pages.flatMap((page) => page)} />
      )}
      {isFetchingNextPage ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <InfiniteScroll fetchData={fetchNextPage} canFetchMore={hasNextPage} />
      )}
    </>
  );
};

export default RenderUserArticles;
