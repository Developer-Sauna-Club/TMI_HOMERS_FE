export type SearchType = 'all' | 'users';

export type SearchParams = {
  type?: 'all' | 'users';
  keyword: string;
};
