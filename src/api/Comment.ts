import { Comment } from '@/type/Comment';
import { axiosClient } from './axiosClient';

export type CommentParams = {
  comment: string;
  postId: string;
  userId: string;
};

export const createComment = async ({ comment, postId }: CommentParams) => {
  const CREATE_COMMENT_URL = '/comments/create';
  const { data } = await axiosClient.post<Comment>(CREATE_COMMENT_URL, { comment, postId });
  return data;
};

export const deleteComment = async (id: string) => {
  const DELETE_COMMENT_URL = '/comments/delete';
  const { data } = await axiosClient.delete<Comment>(DELETE_COMMENT_URL, {
    data: {
      id,
    },
  });
  return data;
};
