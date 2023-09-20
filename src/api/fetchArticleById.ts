import { axiosClient } from './axiosClient';

const fetchArticleById = async (postId: string) => {
  const response = await axiosClient.get(`/posts/${postId}`);
  return response.data;
};

export default fetchArticleById;
