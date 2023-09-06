import axios from 'axios';

const REQUEST_TIME = 3000;

const options = {
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: REQUEST_TIME,
};

export const axiosClient = axios.create({
  ...options,
});
