import type { Post } from '@/type/Post';
import type { User } from '@/type/User';

export type SearchParams = {
  keyword: string;
};

export type SearchData = {
  data: (User | Post)[] | undefined;
};

export type RecentResultParams = {
  isSuccess: boolean;
  keyword: string;
};

export type UserListItemParams = {
  id: string;
  fullName: string;
};
