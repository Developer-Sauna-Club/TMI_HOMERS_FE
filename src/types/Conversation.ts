import type { User } from './User';

export type Conversation = {
  _id: string[];
  message: string;
  sender: User;
  receiver: User;
  seen: boolean;
  createdAt: string;
};
