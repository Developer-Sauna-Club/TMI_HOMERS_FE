import type { Post } from '@type/Post';
import { API } from '@constants/Article';
import { axiosClient } from './axiosClient';

type InfinityScrollParams = {
  offset: number;
  limit: number;
};

export const fetchAllPosts = async ({ offset, limit }: Partial<InfinityScrollParams>) => {
  const FETCH_ALL_POSTS_URL = `/posts/channel/${API.CHANNEL_ID}`;

  const { data } = await axiosClient.get<Post[]>(FETCH_ALL_POSTS_URL, {
    params: { offset, limit },
  });
  return data;
};

export const fetchUserPosts = async ({
  offset,
  limit,
  authorId,
}: Partial<InfinityScrollParams> & { authorId: string }) => {
  const FETCH_USER_POSTS_URL = `/posts/author/${authorId}`;

  const { data } = await axiosClient.get<Post[]>(FETCH_USER_POSTS_URL, {
    params: { offset, limit },
  });

  return data;
};

type CreatePostParams = {
  title: string;
  body: string;
  image: File | null;
};

export const createPost = async ({ title, body, image }: CreatePostParams) => {
  const CREATE_POST_URL = '/posts/create';
  const formData = new FormData();
  formData.append('title', JSON.stringify({ title, body }));
  formData.append('channelId', API.CHANNEL_ID);
  if (image) {
    formData.append('image', image);
  }

  return await axiosClient.post<Post>(CREATE_POST_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const fetchPost = async (postId: string) => {
  const FETCH_POST_URL = `/posts/${postId}`;

  const { data } = await axiosClient.get<Post>(FETCH_POST_URL);
  return data;
};

type UpdatePostParams = {
  postId: string;
  title: string;
  image: File | string | undefined | null;
  imageToDeletePublicId?: string;
  channelId: string;
};

export const updatePost = async ({
  postId,
  title,
  image,
  imageToDeletePublicId,
  channelId,
}: UpdatePostParams) => {
  const UPDATE_POST_URL = '/posts/update';

  const { data } = await axiosClient.put(
    UPDATE_POST_URL,
    {
      postId,
      title,
      image,
      imageToDeletePublicId,
      channelId,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
};

export const deletePost = async (id: string) => {
  const DELETE_POST_URL = '/posts/delete';
  const response = await axiosClient.delete(DELETE_POST_URL, {
    data: {
      id,
    },
  });
  return response;
};
