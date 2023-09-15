import { useMemo } from 'react';
import { Post } from '@type/Post';
import { HOTTEST_ARTICLE_LIKES_THRESHOLD } from '@constants/Article';
import { TabConstants } from '@constants/Tab';

export const useFilteredArticles = (tabFilter: TabConstants, articles: Post[] | undefined) => {
  return useMemo(() => {
    if (tabFilter === TabConstants.HOTTEST) {
      return articles?.filter((article) => article.likes.length >= HOTTEST_ARTICLE_LIKES_THRESHOLD);
    } else if (tabFilter === TabConstants.SUBSCRIBED) {
      // TODO: 현재 사용자의 정보가 있어야 한다. (User 타입의 following)
    } else {
      return articles;
    }
  }, [tabFilter, articles]);
};
