import { API } from '@/constants/Article';
import { axiosClient } from './axiosClient';

type FormValue = {
  title: string;
  body: string;
  image: File | null;
};

export const saveArticle = async ({ title, body, image }: FormValue) => {
  const formData = new FormData();
  formData.append('title', JSON.stringify({ title: title, body: body }));
  formData.append('channelId', API.CHANNEL_ID);
  if (image) {
    formData.append('image', image);
  }

  await axiosClient.post('/posts/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
