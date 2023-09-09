import type { Like } from './Like';
import type { Message } from './Message';
import type { Post } from './Post';

export type User = {
  coverImage?: string; // 커버 이미지
  image?: string; // 프로필 이미지
  role: string;
  emailVerified: boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
  isOnline: boolean;
  posts: Post[];
  likes: Like[];
  comments: string[];
  followers: [];
  following: [
    {
      _id: '6169e91316cb2265df003c6d';
      user: '6169e58216cb2265df003bf4';
      follower: '6169e206aa57d952c6dc1edd';
      createdAt: '2021-10-15T20:48:19.816Z';
      updatedAt: '2021-10-15T20:48:19.816Z';
      __v: 0;
    },
  ];
  notifications: Notification[];
  messages: Message[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
