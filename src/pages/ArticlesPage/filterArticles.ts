import { Post } from '@type/Post';

export const filterArticles = (articles: Post[]) => {
  return articles
    .filter((article, index, self) => index === self.findIndex((a) => a._id === article._id))
    .sort((a, b) => {
      return new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime();
    });
};
