import { useMemo } from 'react';
import { Post } from '@type/Post';
import { HOTTEST_ARTICLE_LIKES_THRESHOLD } from '@constants/Article';
import { TabConstants } from '@constants/Tab';

export const useFilteredArticles = (tabFilter: TabConstants, articles: Post[]) => {
  return useMemo(() => {
    if (tabFilter === TabConstants.HOTTEST) {
      return articles?.filter((article) => article.likes.length >= HOTTEST_ARTICLE_LIKES_THRESHOLD);
    } else {
      return articles;
    }
  }, [tabFilter, articles]);
};
