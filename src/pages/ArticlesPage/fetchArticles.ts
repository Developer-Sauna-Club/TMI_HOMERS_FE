import { fetchAllPosts, fetchUserPosts } from '@api/common/Post';
import { ARTICLE_FETCH_LIMIT } from '@constants/Article';
import { TAB_CONSTANTS } from '@constants/Tab';

type FetchArticlesParams = {
  type: TAB_CONSTANTS.NEWEST | TAB_CONSTANTS.SUBSCRIBED;
  followingUsersIds?: string[];
  pageParam?: number;
};

export const fetchArticles = async ({
  type,
  followingUsersIds,
  pageParam = 0,
}: FetchArticlesParams) => {
  if (type === TAB_CONSTANTS.NEWEST) {
    return await fetchAllPosts({ offset: pageParam, limit: ARTICLE_FETCH_LIMIT });
  }

  if (type === TAB_CONSTANTS.SUBSCRIBED && followingUsersIds) {
    const newArticles = await Promise.all(
      followingUsersIds.map((user) =>
        fetchUserPosts({ offset: pageParam, limit: ARTICLE_FETCH_LIMIT, authorId: user }),
      ),
    );
    return newArticles.flat();
  }

  throw new Error('Invalid fetch type or missing parameters.');
};
