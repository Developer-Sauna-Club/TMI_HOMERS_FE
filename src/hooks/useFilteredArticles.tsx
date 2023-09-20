import { useMemo } from 'react';
import { Post } from '@type/Post';
import { HOTTEST_ARTICLE_LIKES_THRESHOLD } from '@constants/Article';
import { TAB_CONSTANTS } from '@constants/Tab';

export const useFilteredArticles = (tabFilter: TAB_CONSTANTS, articles: Post[]) => {
  return useMemo(() => {
    if (tabFilter === TAB_CONSTANTS.HOTTEST) {
      return articles?.filter((article) => article.likes.length >= HOTTEST_ARTICLE_LIKES_THRESHOLD);
    } else {
      return articles;
    }
  }, [tabFilter, articles]);
};
