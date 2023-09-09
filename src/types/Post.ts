import type { Channel } from './Channel';
import type { Comment } from './Comment';
import type { Like } from './Like';
import type { User } from './User';

export type Post = {
  likes: Like[];
  comments: Comment[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: Channel;
  author: User;
  createdAt: string;
  updatedAt: string;
};
