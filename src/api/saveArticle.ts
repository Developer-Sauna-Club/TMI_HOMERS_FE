import { axiosClient } from './axiosClient';

const CHANNEL_ID = '64fac2e729260903240d2dab';

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
