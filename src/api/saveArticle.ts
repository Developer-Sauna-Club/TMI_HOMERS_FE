import { axiosClient } from './axiosClient';

export const CHANNEL_ID = '6512cdce2692b6795f161818';

type FormValue = {
  title: string;
  body: string;
  image: File | null;
};

export const saveArticle = async ({ title, body, image }: FormValue) => {
  const formData = new FormData();
  formData.append('title', JSON.stringify({ title: title, body: body }));
  formData.append('channelId', CHANNEL_ID);
  if (image) {
    formData.append('image', image);
  }

  await axiosClient.post('/posts/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
