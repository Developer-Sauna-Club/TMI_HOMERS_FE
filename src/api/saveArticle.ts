import { axiosClient } from './axiosClient';

const CHANNEL_ID = '64fac2e729260903240d2dab';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MDU0MzhmOWZhZTk1MmFhMGNmYjViOSIsImVtYWlsIjoiY3l0ZXN0QG5hdmVyLmNvbSJ9LCJpYXQiOjE2OTQ4NDM3OTF9.K0yj-8NtLbEeE9rzKz7Yutbvndc__n8rjLHF1pw_rh4';

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
      Authorization: `bearer ${TOKEN}`,
    },
  });
};
