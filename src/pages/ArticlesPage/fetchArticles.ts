import { Follow } from '@type/Follow';
import { fetchAllPosts, fetchUserPosts } from '@api/common/Post';
import { ARTICLE_FETCH_LIMIT } from '@constants/Article';
import { TAB_CONSTANTS } from '@constants/Tab';

type FetchArticlesParams = {
  type: TAB_CONSTANTS.NEWEST | TAB_CONSTANTS.SUBSCRIBED;
  followingUsers?: Follow[];
  pageParam?: number;
};

export const fetchArticles = async ({
  type,
  followingUsers,
  pageParam = 0,
}: FetchArticlesParams) => {
  if (type === TAB_CONSTANTS.NEWEST) {
    return await fetchAllPosts({ offset: pageParam, limit: ARTICLE_FETCH_LIMIT });
  }

  if (type === TAB_CONSTANTS.SUBSCRIBED && followingUsers) {
    const newArticles = await Promise.all(
      followingUsers.map((user) =>
        fetchUserPosts({ offset: pageParam, limit: ARTICLE_FETCH_LIMIT, authorId: user.user }),
      ),
    );
    return newArticles.flat();
  }

  throw new Error('Invalid fetch type or missing parameters.');
};
