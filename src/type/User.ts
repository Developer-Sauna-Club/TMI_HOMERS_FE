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
  followers: [
    {
      _id: string;
      user: string;
      follower: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    },
  ];
  following: [
    {
      _id: string;
      user: string;
      follower: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    },
  ];
  notifications: Notification[];
  messages: Message[];
  _id: string;
  fullName: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
